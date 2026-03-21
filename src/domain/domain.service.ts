import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { Domain } from 'src/entities/entities/Domain';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { OrderItem } from 'src/entities/entities/OrderItem';
import { S3Service } from 'src/storage/s3.service';
import { User } from 'src/entities/entities/Users';

@Injectable()
export class DomainService extends BaseService<Domain> {
  private static readonly MAX_IMAGES = 5;

  constructor(
    @InjectRepository(Domain)
    private readonly domainRepo: Repository<Domain>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    private readonly s3Service: S3Service,
  ) {
    super(domainRepo);
  }

  // Méthodes DB-first pour gérer la PK domainId
  findOneById(id: number | string) {
    return super.findOne(id, 'domainId');
  }

  async findByCompanyId(companyId: string): Promise<Domain[]> {
    return this.domainRepo.find({ where: { companyId } });
  }

  updateById(id: number | string, dto: Partial<Domain>) {
    return super.update(id, dto, 'domainId');
  }

  async uploadImage(
    domainId: number | string,
    file: Express.Multer.File,
    user: User,
  ) {
    const domain = await this.findOneById(domainId);
    this.assertCanManageCompanyResource(user, domain.companyId);

    const currentImages = this.getImages(domain);
    if (currentImages.length >= DomainService.MAX_IMAGES) {
      throw new BadRequestException('Maximum 5 images par lieu');
    }

    const prefix = process.env.S3_DOMAIN_IMAGES_PREFIX || 'domains';
    const { url } = await this.s3Service.uploadPublicImage(file, prefix);
    const nextImages = [...currentImages, url];

    return this.updateById(domainId, {
      imageUrls: nextImages,
      imageUrl: nextImages[0] ?? null,
    });
  }

  async removeImage(domainId: number | string, user: User, index = 0) {
    const domain = await this.findOneById(domainId);
    this.assertCanManageCompanyResource(user, domain.companyId);

    const currentImages = this.getImages(domain);
    if (currentImages.length === 0) {
      return this.updateById(domainId, { imageUrls: [], imageUrl: null });
    }

    if (index < 0 || index >= currentImages.length) {
      throw new BadRequestException('Index image invalide');
    }

    const [removedUrl] = currentImages.splice(index, 1);
    await this.s3Service.deleteObjectByUrl(removedUrl);

    return this.updateById(domainId, {
      imageUrls: currentImages,
      imageUrl: currentImages[0] ?? null,
    });
  }

  private assertCanManageCompanyResource(user: User, companyId: string): void {
    const isAdmin = Boolean(user.isAdmin) || Boolean(user.isSuperAdmin);
    if (isAdmin) return;

    const canManage = (user.userCompanies || []).some(
      (link) => String(link.companyId) === String(companyId),
    );

    if (!canManage) {
      throw new ForbiddenException(
        'Vous ne pouvez modifier que les lieux de vos societes',
      );
    }
  }

  async removeById(id: number | string) {
    const domainId = String(id);
    const domain = await this.findOneById(id);

    const urlsToDelete = this.getImages(domain);
    for (const url of urlsToDelete) {
      await this.s3Service.deleteObjectByUrl(url);
    }

    await this.domainRepo.manager.transaction(async (manager) => {
      await manager.update(OrderItem, { domainId }, { domainId: null as any });
      await manager.delete(Domain, { domainId });
    });
  }

  private getImages(domain: Domain): string[] {
    const imageUrls = Array.isArray(domain.imageUrls)
      ? domain.imageUrls.filter(Boolean)
      : [];

    if (imageUrls.length > 0) return imageUrls;
    return domain.imageUrl ? [domain.imageUrl] : [];
  }
}
