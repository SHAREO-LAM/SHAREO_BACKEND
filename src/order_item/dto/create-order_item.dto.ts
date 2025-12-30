import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ description: 'ID de la commande associée' })
  @IsString()
  orderId: string;

  @ApiProperty({
    description: "ID de l'équipement de la société",
    required: false,
  })
  @IsOptional()
  @IsString()
  equipementCompanyId?: string;

  @ApiProperty({ description: 'ID du domaine associé', required: false })
  @IsOptional()
  @IsString()
  domainId?: string;

  @ApiProperty({ description: 'Quantité commandée' })
  @IsString()
  quantity: string;

  @ApiProperty({ description: 'Date de début' })
  @IsString()
  startDate: string;

  @ApiProperty({ description: 'Date de fin' })
  @IsString()
  endDate: string;

  @ApiProperty({ description: 'Prix unitaire' })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ description: 'Date de création', required: false })
  @IsOptional()
  @IsString()
  datetimeCreate?: string;

  @ApiProperty({ description: 'Date de mise à jour', required: false })
  @IsOptional()
  @IsString()
  datetimeUpdate?: string;

  @ApiProperty({ description: "ID de l'utilisateur créateur", required: false })
  @IsOptional()
  @IsString()
  userCreateId?: string;

  @ApiProperty({
    description: "ID de l'utilisateur modificateur",
    required: false,
  })
  @IsOptional()
  @IsString()
  userUpdateId?: string;
}
