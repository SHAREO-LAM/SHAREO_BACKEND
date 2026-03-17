import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EquipementCompany } from 'src/entities/entities/EquipementCompany';
import { OrderItem } from 'src/entities/entities/OrderItem';
import { CompanyPayout } from 'src/entities/entities/CompanyPayout';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { IsNull, Repository } from 'typeorm';
import { S3Service } from 'src/storage/s3.service';
import { User } from 'src/entities/entities/Users';

@Injectable()
export class EquipementCompanyService extends BaseService<EquipementCompany> {
  private static readonly MAX_IMAGES = 5;

  constructor(
    @InjectRepository(EquipementCompany)
    private readonly equipementCompanyRepo: Repository<EquipementCompany>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    @InjectRepository(CompanyPayout)
    private readonly companyPayoutRepo: Repository<CompanyPayout>,
    private readonly s3Service: S3Service,
  ) {
    super(equipementCompanyRepo);
  }

  findAll(): Promise<EquipementCompany[]> {
    // Ne retourne que les éléments non supprimés
    return this.equipementCompanyRepo.find({ 
      where: { datetimeDeleted: IsNull() },
      relations: ['equipementType', 'equipementType.equipementCategory'],
    });
  }

  findOneById(id: number | string) {
    return this.equipementCompanyRepo.findOne({
      where: { 
        equipementCompanyId: String(id),
        //datetimeDeleted: IsNull()
      },
      relations: ['equipementType', 'equipementType.equipementCategory'],
    });
  }

  updateById(id: number | string, dto: Partial<EquipementCompany>) {
    return super.update(id, dto, 'equipementCompanyId');
  }

  async uploadImage(
    equipementCompanyId: number | string,
    file: Express.Multer.File,
    user: User,
  ) {
    const equipement = await this.getByIdOrThrow(equipementCompanyId);
    this.assertCanManageCompanyResource(user, equipement.companyId);

    const currentImages = this.getImages(equipement);
    if (currentImages.length >= EquipementCompanyService.MAX_IMAGES) {
      throw new BadRequestException('Maximum 5 images par equipement');
    }

    const prefix = process.env.S3_EQUIPEMENT_IMAGES_PREFIX || 'equipements';
    const { url } = await this.s3Service.uploadPublicImage(file, prefix);
    const nextImages = [...currentImages, url];

    return this.updateById(equipementCompanyId, {
      imageUrls: nextImages,
      imageUrl: nextImages[0] ?? null,
    });
  }

  async removeImage(
    equipementCompanyId: number | string,
    user: User,
    index = 0,
  ) {
    const equipement = await this.getByIdOrThrow(equipementCompanyId);
    this.assertCanManageCompanyResource(user, equipement.companyId);

    const currentImages = this.getImages(equipement);
    if (currentImages.length === 0) {
      return this.updateById(equipementCompanyId, { imageUrls: [], imageUrl: null });
    }

    if (index < 0 || index >= currentImages.length) {
      throw new BadRequestException('Index image invalide');
    }

    const [removedUrl] = currentImages.splice(index, 1);
    await this.s3Service.deleteObjectByUrl(removedUrl);

    return this.updateById(equipementCompanyId, {
      imageUrls: currentImages,
      imageUrl: currentImages[0] ?? null,
    });
  }

  async removeById(id: number | string) {
    const equipementCompanyId = String(id);
    const equipement = await this.getByIdOrThrow(id);

    const urlsToDelete = this.getImages(equipement);
    for (const url of urlsToDelete) {
      await this.s3Service.deleteObjectByUrl(url);
    }

    await this.equipementCompanyRepo.manager.transaction(async (manager) => {
      await manager.update(
        OrderItem,
        { equipementCompanyId },
        { equipementCompanyId: null as any },
      );
      await manager.delete(EquipementCompany, { equipementCompanyId });
    });
  }

  async findByCompanyId(companyId: string): Promise<EquipementCompany[]> {
    return this.equipementCompanyRepo.find({
      where: { companyId },
      relations: ['equipementType', 'equipementType.equipementCategory'],
    });
  }
  private getImages(equipement: EquipementCompany): string[] {
    const imageUrls = Array.isArray(equipement.imageUrls)
      ? equipement.imageUrls.filter(Boolean)
      : [];

    if (imageUrls.length > 0) return imageUrls;
    return equipement.imageUrl ? [equipement.imageUrl] : [];
  }

  private async getByIdOrThrow(
    id: number | string,
  ): Promise<EquipementCompany> {
    const equipement = await this.findOneById(id);
    if (!equipement) {
      throw new NotFoundException(`Equipement #${id} not found`);
    }
    return equipement;
  }

  private assertCanManageCompanyResource(user: User, companyId: string): void {
    const isAdmin = Boolean(user.isAdmin) || Boolean(user.isSuperAdmin);
    if (isAdmin) return;

    const canManage = (user.userCompanies || []).some(
      (link) => String(link.companyId) === String(companyId),
    );

    if (!canManage) {
      throw new ForbiddenException(
        'Vous ne pouvez modifier que les equipements de vos societes',
      );
    }
  }
}