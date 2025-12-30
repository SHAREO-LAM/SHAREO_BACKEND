import { PartialType } from '@nestjs/swagger';
import { CreateEquipementCompanyDto } from './create-equipement_company.dto';

export class UpdateEquipementCompanyDto extends PartialType(CreateEquipementCompanyDto) {}
