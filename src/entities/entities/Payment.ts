import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Orders';
import { PaymentStatus } from './PaymentStatus';

@Index('payment_pkey', ['paymentId'], { unique: true })
@Entity('payment', { schema: 'public' })
export class Payment {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'payment_id' })
  paymentId: string;

  @Column('double precision', { name: 'amount', precision: 53 })
  amount: number;

  @Column('character varying', {
    name: 'provider',
    nullable: true,
    length: 255,
  })
  provider: string | null;

  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @Column('bigint', { name: 'order_id', nullable: true })
  orderId: string;

  @Column('bigint', { name: 'payment_status_id', nullable: true })
  paymentStatusId: string;

  @ManyToOne(() => Order, (order) => order.payments)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'orderId' }])
  order: Order;

  @ManyToOne(() => PaymentStatus, (paymentStatus) => paymentStatus.payments)
  @JoinColumn([
    { name: 'payment_status_id', referencedColumnName: 'paymentStatusId' },
  ])
  paymentStatus: PaymentStatus;
}
