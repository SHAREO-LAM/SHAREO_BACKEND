import { Injectable } from '@nestjs/common';
import { EquipementCompany } from 'src/entities/entities/EquipementCompany';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class EquipementCompanyService extends BaseService<EquipementCompany> {
  constructor(
    @InjectRepository(EquipementCompany)
    private readonly equipementCompanyRepo: Repository<EquipementCompany>,
  ) {
    super(equipementCompanyRepo);
  }

  // Méthodes avec la clé primaire réelle
  findOneById(id: number | string) {
    return super.findOne(id, 'equipementCompanyId');
  }

  updateById(id: number | string, dto: Partial<EquipementCompany>) {
    return super.update(id, dto, 'equipementCompanyId');
  }

  removeById(id: number | string) {
    return super.remove(id, 'equipementCompanyId');
  }
}
