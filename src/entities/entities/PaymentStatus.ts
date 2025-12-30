import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Payment } from './Payment';

@Index('payment_status_pkey', ['paymentStatusId'], { unique: true })
@Entity('payment_status', { schema: 'public' })
export class PaymentStatus {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'payment_status_id' })
  paymentStatusId: string;

  @Column('character varying', { name: 'code', length: 255 })
  code: string;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @OneToMany(() => Payment, (payment) => payment.paymentStatus)
  payments: Payment[];
}
