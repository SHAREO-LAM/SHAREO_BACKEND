import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateUserInformationsDto {
  @ApiProperty({ description: 'Prénom', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Nom de famille', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ description: 'Nom de la rue', required: false })
  @IsOptional()
  @IsString()
  streetName?: string;

  @ApiProperty({ description: 'Complément de la rue', required: false })
  @IsOptional()
  @IsString()
  streetNameAdd?: string;

  @ApiProperty({ description: 'Numéro de la maison', required: false })
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

  @ApiProperty({ description: 'Téléphone', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

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

  @ApiProperty({ description: 'ID de l’utilisateur associé' })
  @IsString()
  userId: string; // pour lier à l’utilisateur existant
}
