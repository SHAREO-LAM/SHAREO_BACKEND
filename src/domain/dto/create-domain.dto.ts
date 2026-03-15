import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateDomainDto {

  @ApiProperty({ description: 'Nom du domaine' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Description du domaine' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Nom de la rue' })
  @IsOptional()
  @IsString()
  streetName?: string;

  @ApiPropertyOptional({ description: 'Complément de rue' })
  @IsOptional()
  @IsString()
  streetNameAdd?: string;

  @ApiPropertyOptional({ description: 'Numéro de maison' })
  @IsOptional()
  @IsString()
  houseNumber?: string;

  @ApiPropertyOptional({ description: 'Code postal' })
  @IsOptional()
  @IsString()
  postcode?: string;

  @ApiPropertyOptional({ description: 'Ville' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ description: 'Pays' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ description: 'Latitude', type: Number })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiPropertyOptional({ description: 'Longitude', type: Number })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ description: 'Prix par jour', type: Number })
  @IsOptional()
  @IsNumber()
  pricePerDay?: number;

  @ApiPropertyOptional({ description: 'Capacité' })
  @IsOptional()
  @IsString()
  capacity?: string;

  @ApiPropertyOptional({ description: 'URL de l’image' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ description: 'Date de création' })
  @IsOptional()
  @IsString()
  datetimeCreate?: string;

  @ApiPropertyOptional({ description: 'Date de mise à jour' })
  @IsOptional()
  @IsString()
  datetimeUpdate?: string;

  @ApiPropertyOptional({ description: 'ID de l’utilisateur créateur' })
  @IsOptional()
  @IsString()
  userCreateId?: string;

  @ApiPropertyOptional({ description: 'ID de l’utilisateur modificateur' })
  @IsOptional()
  @IsString()
  userUpdateId?: string;

  @ApiProperty({ description: 'ID de l’entreprise associée' })
  @IsString()
  companyId: string;
}