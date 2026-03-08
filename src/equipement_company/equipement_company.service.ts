import { Injectable } from '@nestjs/common';
import { EquipementCompany } from 'src/entities/entities/EquipementCompany';
import { OrderItem } from 'src/entities/entities/OrderItem';
import { CompanyPayout } from 'src/entities/entities/CompanyPayout';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';

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
      return this.equipementCompanyRepo.find({ 
        relations: ['equipementType', 'equipementType.equipementCategory'],
      });
  }

  // Méthodes avec la clé primaire réelle
  findOneById(id: number | string) {
    return this.equipementCompanyRepo.findOne({
      where: { equipementCompanyId: String(id) },
      relations: ['equipementType', 'equipementType.equipementCategory'],
    });
  }

  updateById(id: number | string, dto: Partial<EquipementCompany>) {
    return super.update(id, dto, 'equipementCompanyId');
  }

  async removeById(id: number | string) {
    const idStr = String(id);
   
    await this.equipementCompanyRepo.delete({ equipementCompanyId: idStr });
  }
}
