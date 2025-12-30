import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateEquipementTypeDto {
  @ApiProperty({ description: 'Nom du type d’équipement' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Code du type d’équipement' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'ID de la catégorie associée' })
  @IsString()
  equipementCategoryId: string;

  @ApiProperty({ description: 'Date de création', required: false })
  @IsOptional()
  @IsString()
  datetimeCreate?: string;

  @ApiProperty({ description: 'Date de mise à jour', required: false })
  @IsOptional()
  @IsString()
  datetimeUpdate?: string;

  @ApiProperty({ description: 'ID de l’utilisateur créateur', required: false })
  @IsOptional()
  @IsString()
  userCreateId?: string;

  @ApiProperty({
    description: 'ID de l’utilisateur modificateur',
    required: false,
  })
  @IsOptional()
  @IsString()
  userUpdateId?: string;
}
