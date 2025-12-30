import { PartialType } from '@nestjs/swagger';
import { CreateEquipementTypeDto } from './create-equipement_type.dto';

export class UpdateEquipementTypeDto extends PartialType(CreateEquipementTypeDto) {}
