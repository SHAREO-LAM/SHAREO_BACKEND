import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateEquipementCompanyDto {
  @ApiProperty({ description: 'Nom affiché de l’équipement' })
  @IsString()
  displayName: string;

  @ApiProperty({ description: 'Description de l’équipement', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Prix par jour' })
  @IsNumber()
  pricePerDay: number;

  @ApiProperty({ description: 'Stock disponible' })
  @IsString()
  stock: string;

  @ApiProperty({ description: 'URL de l image', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ description: 'URLs des images (max 5)', required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageUrls?: string[];

  @ApiProperty({ description: 'ID de la société' })
  @IsNumberString()
  companyId: string;

  @ApiProperty({ description: 'ID du type d’équipement' })
  @IsNumberString()
  equipementTypeId: string;

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
