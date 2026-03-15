import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Company } from 'src/entities/entities/Company';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Domain } from 'src/entities/entities/Domain';
import { EquipementCompany } from 'src/entities/entities/EquipementCompany';
import { UserCompany } from 'src/entities/entities/UserCompany';
import { CompanyPayout } from 'src/entities/entities/CompanyPayout';
import { OrderItem } from 'src/entities/entities/OrderItem';

@Injectable()
export class CompanyService extends BaseService<Company> {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
    @InjectRepository(Domain)
    private readonly domainRepo: Repository<Domain>,
    @InjectRepository(EquipementCompany)
    private readonly equipementCompanyRepo: Repository<EquipementCompany>,
    @InjectRepository(UserCompany)
    private readonly userCompanyRepo: Repository<UserCompany>,
    @InjectRepository(CompanyPayout)
    private readonly companyPayoutRepo: Repository<CompanyPayout>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
  ) {
    super(companyRepo);
  }

  // Méthodes DB-first pour gérer la PK companyId
  findOneById(id: number | string) {
    return super.findOne(id, 'companyId');
  }

  updateById(id: number | string, dto: Partial<Company>) {
    return super.update(id, dto, 'companyId');
  }

  async removeById(id: number | string) {
    const companyId = String(id);
    await this.findOneById(id);

    await this.companyRepo.manager.transaction(async (manager) => {
      const domains = await manager.find(Domain, {
        select: { domainId: true },
        where: { companyId },
      });
      const equipements = await manager.find(EquipementCompany, {
        select: { equipementCompanyId: true },
        where: { companyId },
      });

      const domainIds = domains.map((item) => item.domainId);
      const equipementIds = equipements.map((item) => item.equipementCompanyId);

      if (domainIds.length > 0) {
        await manager.update(
          OrderItem,
          { domainId: In(domainIds) },
          { domainId: null as any },
        );
      }

      if (equipementIds.length > 0) {
        await manager.update(
          OrderItem,
          { equipementCompanyId: In(equipementIds) },
          { equipementCompanyId: null as any },
        );
      }

      await manager.delete(UserCompany, { companyId });
      await manager.delete(CompanyPayout, { companyId });
      await manager.delete(Domain, { companyId });
      await manager.delete(EquipementCompany, { companyId });
      await manager.delete(Company, { companyId });
    });
  }
}
