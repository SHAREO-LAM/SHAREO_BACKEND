import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './Orders';
import { UserCompany } from './UserCompany';
import { UserInformations } from './UserInformations';

@Index('users_pkey', ['userId'], { unique: true })
@Entity('users', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'user_id' })
  userId: string;

  @Column('character varying', { name: 'login', length: 255 })
  login: string;

  @Column('character varying', { name: 'email', length: 255 })
  email: string;

  @Column('character varying', { name: 'password', length: 255 })
  password: string;

  @Column('boolean', { name: 'is_admin', nullable: true })
  isAdmin: boolean | null;

  @Column('boolean', { name: 'is_super_admin', nullable: true })
  isSuperAdmin: boolean | null;

  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => UserCompany, (userCompany) => userCompany.user)
  userCompanies: UserCompany[];

  @OneToMany(
    () => UserInformations,
    (userInformations) => userInformations.user,
  )
  userInformations: UserInformations[];
}
