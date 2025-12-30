import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Orders';

@Index('order_status_pkey', ['orderStatusId'], { unique: true })
@Entity('order_status', { schema: 'public' })
export class OrderStatus {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'order_status_id' })
  orderStatusId: string;

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

  @OneToMany(() => Order, (order) => order.status)
  orders: Order[];
}
