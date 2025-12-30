import { PartialType } from '@nestjs/swagger';
import { CreateEquipementCategoryDto } from './create-equipement_category.dto';

export class UpdateEquipementCategoryDto extends PartialType(
  CreateEquipementCategoryDto,
) {}
