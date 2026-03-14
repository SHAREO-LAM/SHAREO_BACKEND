import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Company } from './Company';
import { OrderItem } from './OrderItem';
import { PayoutStatus } from './PayoutStatus';

@Index('company_payout_pkey', ['companyPayoutId'], { unique: true })
@Entity('company_payout', { schema: 'public' })
export class CompanyPayout {
  @ApiProperty({ description: 'ID du payout' })
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'company_payout_id' })
  companyPayoutId: string;

  @ApiProperty({ description: 'ID de la société' })
  @Column('bigint', { name: 'company_id' })
  companyId: string;

  @ApiProperty({ description: 'ID de l’item de commande' })
  @Column('bigint', { name: 'order_item_id' })
  orderItemId: string;

  @ApiProperty({ description: 'Montant du payout' })
  @Column('double precision', { name: 'amount', precision: 53 })
  amount: number;

  @ApiProperty({ description: 'ID du statut du payout' })
  @Column('bigint', { name: 'payout_status_id' })
  payoutStatusId: string;

  @ApiProperty({ description: 'Date de création du payout' })
  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @ApiPropertyOptional({ description: 'Date de mise à jour du payout' })
  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @ApiPropertyOptional({ description: 'ID utilisateur créateur du payout' })
  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @ApiPropertyOptional({ description: 'ID utilisateur mise à jour du payout' })
  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @ApiProperty({ type: () => Company, description: 'Société associée' })
  @ManyToOne(() => Company, (company) => company.companyPayouts)
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'companyId' }])
  company: Company;

  @ApiProperty({ type: () => OrderItem, description: 'Item de commande associé' })
  @ManyToOne(() => OrderItem, (orderItem) => orderItem.companyPayouts)
  @JoinColumn([{ name: 'order_item_id', referencedColumnName: 'orderItemId' }])
  orderItem: OrderItem;

  @ApiProperty({ type: () => PayoutStatus, description: 'Statut du payout' })
  @ManyToOne(() => PayoutStatus, (payoutStatus) => payoutStatus.companyPayouts)
  @JoinColumn([{ name: 'payout_status_id', referencedColumnName: 'payoutStatusId' }])
  payoutStatus: PayoutStatus;
}