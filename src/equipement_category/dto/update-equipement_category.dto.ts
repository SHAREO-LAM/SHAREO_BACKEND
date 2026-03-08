import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateEquipementCategoryDto } from './create-equipement_category.dto';
import { Expose, Transform } from 'class-transformer';

export class UpdateEquipementCategoryDto extends PartialType(
  CreateEquipementCategoryDto,
) {
  @ApiProperty({ description: 'ID de la catégorie' })
  @Expose()
  @Transform(({ obj }) => obj.equipementCategoryId)
  id: string;
}
