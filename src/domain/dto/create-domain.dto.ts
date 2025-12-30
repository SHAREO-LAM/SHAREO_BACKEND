import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateDomainDto {
  @ApiProperty({ description: 'Nom du domaine' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description du domaine', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Nom de la rue', required: false })
  @IsOptional()
  @IsString()
  streetName?: string;

  @ApiProperty({ description: 'Complément de rue', required: false })
  @IsOptional()
  @IsString()
  streetNameAdd?: string;

  @ApiProperty({ description: 'Numéro de maison', required: false })
  @IsOptional()
  @IsString()
  houseNumber?: string;

  @ApiProperty({ description: 'Code postal', required: false })
  @IsOptional()
  @IsString()
  postcode?: string;

  @ApiProperty({ description: 'Ville', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ description: 'Pays', required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ description: 'Latitude', required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ description: 'Longitude', required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ description: 'Prix par jour', required: false })
  @IsOptional()
  @IsNumber()
  pricePerDay?: number;

  @ApiProperty({ description: 'Capacité', required: false })
  @IsOptional()
  @IsString()
  capacity?: string;

  @ApiProperty({ description: 'URL de l’image', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

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

  @ApiProperty({ description: 'ID de l’entreprise associée' })
  @IsString()
  companyId: string;
}
