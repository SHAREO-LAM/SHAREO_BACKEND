import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreatePayoutStatusDto {
  @ApiProperty({ description: 'Code du statut', maxLength: 255 })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Nom du statut', maxLength: 255 })
  @IsString()
  name: string;

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

export class UpdatePayoutStatusDto {
  @ApiProperty({
    description: 'Code du statut',
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    description: 'Nom du statut',
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'ID de l’utilisateur modificateur',
    required: false,
  })
  @IsOptional()
  @IsString()
  userUpdateId?: string;
}
