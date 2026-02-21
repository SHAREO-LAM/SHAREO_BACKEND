import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEquipementCompanyDto } from './create-equipement_company.dto';
import { IsString } from 'class-validator';

export class UpdateEquipementCompanyDto extends PartialType(
  CreateEquipementCompanyDto,
) {
    @ApiProperty({ description: 'Id de l’équipement' })
    @IsString()
    id: string;
}
