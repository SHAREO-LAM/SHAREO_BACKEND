import { PartialType, ApiProperty } from '@nestjs/swagger';
import { UpdateEquipementCompanyDto } from './update-equipement_company.dto';
import { EquipementTypeReadDto } from 'src/equipement_type/dto/read-equipement_type.dto';

export class EquipementCompanyReadDto extends PartialType(UpdateEquipementCompanyDto) {
  @ApiProperty({ description: "ID de l'équipement" })
  equipementCompanyId: string;

  @ApiProperty({ type: () => EquipementTypeReadDto, required: false })
  equipementType?: EquipementTypeReadDto;
}