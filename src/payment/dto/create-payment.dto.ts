import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ description: 'Montant du paiement' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Fournisseur du paiement', required: false })
  @IsOptional()
  @IsString()
  provider?: string;

  @ApiProperty({
    description: 'ID de l’utilisateur qui a créé',
    required: false,
  })
  @IsOptional()
  @IsString()
  userCreateId?: string;

  @ApiProperty({
    description: 'ID de l’utilisateur qui a mis à jour',
    required: false,
  })
  @IsOptional()
  @IsString()
  userUpdateId?: string;

  @ApiProperty({ description: 'ID de la commande associée' })
  @IsString()
  orderId: string;

  @ApiProperty({ description: 'ID du statut de paiement' })
  @IsString()
  paymentStatusId: string;
}

export class UpdatePaymentDto {
  @ApiProperty({ description: 'Montant du paiement', required: false })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({ description: 'Fournisseur du paiement', required: false })
  @IsOptional()
  @IsString()
  provider?: string;

  @ApiProperty({
    description: 'ID de l’utilisateur qui a mis à jour',
    required: false,
  })
  @IsOptional()
  @IsString()
  userUpdateId?: string;

  @ApiProperty({ description: 'ID de la commande associée', required: false })
  @IsOptional()
  @IsString()
  orderId?: string;

  @ApiProperty({ description: 'ID du statut de paiement', required: false })
  @IsOptional()
  @IsString()
  paymentStatusId?: string;
}
