import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from './OrderStatus';
import { User } from './Users';
import { OrderItem } from './OrderItem';
import { Payment } from './Payment';

@Index('orders_pkey', ['orderId'], { unique: true })
@Entity('orders', { schema: 'public' })
export class Order {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'order_id' })
  orderId: string;

  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @Column('bigint', { name: 'status_id' })
  statusId: string;

  @Column('bigint', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orders)
  @JoinColumn([{ name: 'status_id', referencedColumnName: 'orderStatusId' }])
  status: OrderStatus;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
