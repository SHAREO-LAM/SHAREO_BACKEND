import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Payment } from './Payment';

@Index('payment_status_pkey', ['paymentStatusId'], { unique: true })
@Entity('payment_status', { schema: 'public' })
export class PaymentStatus {
  @ApiProperty({ description: 'ID du statut de paiement' })
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'payment_status_id' })
  paymentStatusId: string;

  @ApiProperty({ description: 'Code du statut de paiement' })
  @Column('varchar', { name: 'code', length: 255 })
  code: string;

  @ApiProperty({ description: 'Nom du statut de paiement' })
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @ApiProperty({ description: 'Date de création du statut de paiement' })
  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @ApiProperty({ description: 'Date de mise à jour du statut de paiement' })
  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @ApiProperty({ description: 'ID utilisateur créateur du statut' })
  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @ApiProperty({ description: 'ID utilisateur mise à jour du statut' })
  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @ApiProperty({ type: () => [Payment], description: 'Paiements associés au statut' })
  @OneToMany(() => Payment, (payment) => payment.paymentStatus)
  payments: Payment[];
}