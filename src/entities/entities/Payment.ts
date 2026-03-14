import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from './Orders';
import { PaymentStatus } from './PaymentStatus';

@Index('payment_pkey', ['paymentId'], { unique: true })
@Entity('payment', { schema: 'public' })
export class Payment {
  @ApiProperty({ description: 'ID du paiement' })
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'payment_id' })
  paymentId: string;

  @ApiProperty({ description: 'Montant du paiement' })
  @Column('double precision', { name: 'amount', precision: 53 })
  amount: number;

  @ApiPropertyOptional({ description: 'Fournisseur du paiement' })
  @Column('varchar', { name: 'provider', length: 255, nullable: true })
  provider: string | null;

  @ApiProperty({ description: 'Date de création du paiement' })
  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @ApiPropertyOptional({ description: 'Date de mise à jour du paiement' })
  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @ApiPropertyOptional({ description: 'ID utilisateur créateur du paiement' })
  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @ApiPropertyOptional({ description: 'ID utilisateur mise à jour du paiement' })
  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @ApiProperty({ description: 'ID de la commande associée' })
  @Column('bigint', { name: 'order_id', nullable: true })
  orderId: string;

  @ApiProperty({ description: 'ID du statut de paiement associé' })
  @Column('bigint', { name: 'payment_status_id', nullable: true })
  paymentStatusId: string;

  @ApiProperty({ type: () => Order, description: 'Commande associée au paiement' })
  @ManyToOne(() => Order, (order) => order.payments)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'orderId' }])
  order: Order;

  @ApiProperty({ type: () => PaymentStatus, description: 'Statut du paiement' })
  @ManyToOne(() => PaymentStatus, (paymentStatus) => paymentStatus.payments)
  @JoinColumn([{ name: 'payment_status_id', referencedColumnName: 'paymentStatusId' }])
  paymentStatus: PaymentStatus;
}