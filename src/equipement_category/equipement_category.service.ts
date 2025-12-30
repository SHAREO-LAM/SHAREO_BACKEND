import { Injectable } from '@nestjs/common';
import { EquipementCategory } from 'src/entities/entities/EquipementCategory';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class EquipementCategoryService extends BaseService<EquipementCategory> {
  constructor(
    @InjectRepository(EquipementCategory)
    private readonly equipementCategoryRepo: Repository<EquipementCategory>,
  ) {
    super(equipementCategoryRepo);
  }

  // Méthodes pour utiliser la PK equipementCategoryId
  findOneById(id: number | string) {
    return super.findOne(id, 'equipementCategoryId');
  }

  updateById(id: number | string, dto: Partial<EquipementCategory>) {
    return super.update(id, dto, 'equipementCategoryId');
  }

  removeById(id: number | string) {
    return super.remove(id, 'equipementCategoryId');
  }
}
