import { Injectable } from '@nestjs/common';
import { EquipementType } from 'src/entities/entities/EquipementType';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class EquipementTypeService extends BaseService<EquipementType> {
  constructor(
    @InjectRepository(EquipementType)
    private readonly equipementTypeRepo: Repository<EquipementType>,
  ) {
    super(equipementTypeRepo);
  }

  findOneById(id: number | string) {
    return super.findOne(id, 'equipementTypeId');
  }

  updateById(id: number | string, dto: Partial<EquipementType>) {
    return super.update(id, dto, 'equipementTypeId');
  }

  removeById(id: number | string) {
    return super.remove(id, 'equipementTypeId');
  }
}
