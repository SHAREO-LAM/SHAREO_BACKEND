import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCompanyPayoutDto {
  @ApiProperty({ description: 'Montant du paiement' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: "ID de l'utilisateur qui crée", required: false })
  @IsOptional()
  @IsString()
  userCreateId?: string;

  @ApiProperty({
    description: "ID de l'utilisateur qui met à jour",
    required: false,
  })
  @IsOptional()
  @IsString()
  userUpdateId?: string;

  @ApiProperty({ description: 'ID de la société' })
  @IsString()
  companyId: string;

  @ApiProperty({ description: "ID de l'order item" })
  @IsString()
  orderItemId: string;

  @ApiProperty({ description: 'ID du statut du paiement' })
  @IsString()
  payoutStatusId: string;
}

export class UpdateCompanyPayoutDto {
  @ApiProperty({ description: 'Montant du paiement', required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({
    description: "ID de l'utilisateur qui met à jour",
    required: false,
  })
  @IsOptional()
  @IsString()
  userUpdateId?: string;

  @ApiProperty({ description: 'ID de la société', required: false })
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiProperty({ description: "ID de l'order item", required: false })
  @IsOptional()
  @IsString()
  orderItemId?: string;

  @ApiProperty({ description: 'ID du statut du paiement', required: false })
  @IsOptional()
  @IsString()
  payoutStatusId?: string;
}
