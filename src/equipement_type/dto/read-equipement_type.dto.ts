import { PartialType, ApiProperty } from '@nestjs/swagger';
import { UpdateEquipementTypeDto } from 'src/equipement_type/dto/update-equipement_type.dto';
import { UpdateEquipementCategoryDto } from 'src/equipement_category/dto/update-equipement_category.dto';

export class EquipementTypeReadDto extends PartialType(
  UpdateEquipementTypeDto,
) {
  @ApiProperty({ type: () => UpdateEquipementCategoryDto, required: false })
  equipementCategory?: UpdateEquipementCategoryDto;
}
