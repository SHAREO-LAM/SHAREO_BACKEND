import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateOrderStatusDto {
  @ApiProperty({ description: 'Code du statut' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Nom du statut' })
  @IsString()
  name: string;

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
