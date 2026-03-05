import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { CompanyStatusEnum } from '../enums/company-status.enum';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Nom de l’entreprise' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description de l’entreprise', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'SIRET', required: false })
  @IsOptional()
  @IsString()
  siret?: string;

  @ApiProperty({ description: 'Numéro de TVA', required: false })
  @IsOptional()
  @IsString()
  tvaNumber?: string;

  @ApiProperty({ description: 'Forme juridique', required: false })
  @IsOptional()
  @IsString()
  legalForm?: string;

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

  @ApiProperty({ description: 'Téléphone', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Email', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: 'Site web', required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ description: 'Logo URL', required: false })
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @ApiProperty({ description: 'Statut de l’entreprise', enum: CompanyStatusEnum, required: false })
  @IsOptional()
  @IsEnum(CompanyStatusEnum)
  status?: CompanyStatusEnum;

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
