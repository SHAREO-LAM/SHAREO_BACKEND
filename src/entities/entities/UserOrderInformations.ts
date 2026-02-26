import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './Users';
import { Order } from './Orders';
import { UserInformations } from './UserInformations';

@Index('user_order_informations_pkey', ['userOrderInformationsId'], {
  unique: true,
})
@Entity('user_order_informations', { schema: 'public' })
export class UserOrderInformations {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_order_informations_id',
  })
  userOrderInformationsId: string;

  @Column('character varying', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('character varying', {
    name: 'last_name',
    nullable: true,
    length: 255,
  })
  lastName: string | null;

  @Column('character varying', {
    name: 'street_name',
    nullable: true,
    length: 255,
  })
  streetName: string | null;

  @Column('character varying', {
    name: 'street_name_add',
    nullable: true,
    length: 255,
  })
  streetNameAdd: string | null;

  @Column('bigint', { name: 'house_number', nullable: true })
  houseNumber: string | null;

  @Column('character varying', {
    name: 'postcode',
    nullable: true,
    length: 255,
  })
  postcode: string | null;

  @Column('character varying', { name: 'city', nullable: true, length: 255 })
  city: string | null;

  @Column('character varying', { name: 'country', nullable: true, length: 255 })
  country: string | null;

  @Column('character varying', { name: 'phone', nullable: true, length: 255 })
  phone: string | null;

  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @Column('bigint', { name: 'user_id', nullable: true })
  userId: string;

  @Column('bigint', { name: 'order_id', nullable: true })
  orderId: string;

  @Column('bigint', { name: 'user_informations_id', nullable: true })
  userInformationsId: string;

  @ManyToOne(() => User, (user) => user.userOrderInformations)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;

  @ManyToOne(() => Order, (order) => order.userOrderInformations)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'orderId' }])
  order: Order;

  @ManyToOne(() => UserInformations, (infos) => infos.userOrderInformations, {
    nullable: true,
  })
  @JoinColumn([
    {
      name: 'user_informations_id',
      referencedColumnName: 'userInformationsId',
    },
  ])
  userInformations: UserInformations;
}
