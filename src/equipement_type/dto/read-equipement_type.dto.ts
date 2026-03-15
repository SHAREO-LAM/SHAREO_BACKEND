import { PartialType, ApiProperty } from '@nestjs/swagger';
import { UpdateEquipementTypeDto } from 'src/equipement_type/dto/update-equipement_type.dto';
import { UpdateEquipementCategoryDto } from 'src/equipement_category/dto/update-equipement_category.dto';
import { Expose, Type, Transform } from 'class-transformer';

export class EquipementTypeReadDto extends PartialType(
  UpdateEquipementTypeDto,
) {
  @ApiProperty({ description: 'ID du type d’équipement' })
  @Expose()
  @Transform(({ obj }) => obj.equipementTypeId)
  id: string;

  @ApiProperty({ type: () => UpdateEquipementCategoryDto, required: false })
  @Expose()
  @Type(() => UpdateEquipementCategoryDto)
  equipementCategory?: UpdateEquipementCategoryDto;
}
