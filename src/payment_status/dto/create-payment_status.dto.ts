import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePaymentStatusDto {
  @ApiProperty({ description: 'Code du statut de paiement', example: 'PAID' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: 'Nom du statut de paiement', example: 'Payé' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID de l’utilisateur créateur',
    example: '1',
    required: false,
  })
  @IsOptional()
  @IsString()
  userCreateId?: string;

  @ApiProperty({
    description: 'ID de l’utilisateur modificateur',
    example: '2',
    required: false,
  })
  @IsOptional()
  @IsString()
  userUpdateId?: string;
}

export class UpdatePaymentStatusDto {
  @ApiProperty({
    description: 'Code du statut de paiement',
    example: 'PAID',
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    description: 'Nom du statut de paiement',
    example: 'Payé',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'ID de l’utilisateur créateur',
    example: '1',
    required: false,
  })
  @IsOptional()
  @IsString()
  userCreateId?: string;

  @ApiProperty({
    description: 'ID de l’utilisateur modificateur',
    example: '2',
    required: false,
  })
  @IsOptional()
  @IsString()
  userUpdateId?: string;
}
