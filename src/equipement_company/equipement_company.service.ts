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
        //where: { datetimeDelete: null }
      });
  }

  // Méthodes avec la clé primaire réelle
  findOneById(id: number | string) {
    return this.equipementCompanyRepo.findOne({
      //where: { equipementCompanyId: String(id), datetimeDelete: null },
      relations: ['equipementType', 'equipementType.equipementCategory'],
    });
  }

  updateById(id: number | string, dto: Partial<EquipementCompany>) {
    return super.update(id, dto, 'equipementCompanyId');
  }

  async removeById(id: number | string) {
    const idStr = String(id);
    // // Marquer les paiements de société liés aux réservations de cet équipement comme supprimés
    // await this.companyPayoutRepo
    //   .createQueryBuilder()
    //   .update()
    //   //.set({ datetimeDelete: new Date() })
    //   .where('orderItemId IN (SELECT order_item_id FROM order_item WHERE equipement_company_id = :id AND datetime_delete IS NULL)', { id: idStr })
    //   .execute();
    // // Marquer les réservations (OrderItems) liées à cet équipement comme supprimées
    // await this.orderItemRepo.update({ equipementCompanyId: idStr, datetimeDelete: null }, { datetimeDelete: new Date() });
    // // Marquer l'équipement comme supprimé
    // await this.equipementCompanyRepo.update({ equipementCompanyId: idStr }, { datetimeDelete: new Date() });
    this.equipementCompanyRepo.delete({ equipementCompanyId: idStr });
  }
}
