import { Injectable } from '@nestjs/common';
import { EquipementCompany } from 'src/entities/entities/EquipementCompany';
import { OrderItem } from 'src/entities/entities/OrderItem';
import { CompanyPayout } from 'src/entities/entities/CompanyPayout';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { IsNull, Repository } from 'typeorm';
import { OrderItem } from 'src/entities/entities/OrderItem';

@Injectable()
export class EquipementCompanyService extends BaseService<EquipementCompany> {
  constructor(
    @InjectRepository(EquipementCompany)
    private readonly equipementCompanyRepo: Repository<EquipementCompany>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    @InjectRepository(CompanyPayout)
    private readonly companyPayoutRepo: Repository<CompanyPayout>,
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

  async removeById(id: number | string) {
    const equipementCompanyId = String(id);
    await this.findOneById(id);

    await this.equipementCompanyRepo.manager.transaction(async (manager) => {
      await manager.update(
        OrderItem,
        { equipementCompanyId },
        { equipementCompanyId: null as any },
      );
      await manager.delete(EquipementCompany, { equipementCompanyId });
    });
  }
}