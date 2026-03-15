import { Injectable } from '@nestjs/common';
import { EquipementCompany } from 'src/entities/entities/EquipementCompany';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { OrderItem } from 'src/entities/entities/OrderItem';

@Injectable()
export class EquipementCompanyService extends BaseService<EquipementCompany> {
  constructor(
    @InjectRepository(EquipementCompany)
    private readonly equipementCompanyRepo: Repository<EquipementCompany>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
  ) {
    super(equipementCompanyRepo);
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
