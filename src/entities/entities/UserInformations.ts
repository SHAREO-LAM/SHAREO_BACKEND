import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './Users';

@Index('user_informations_pkey', ['userInformationsId'], { unique: true })
@Entity('user_informations', { schema: 'public' })
export class UserInformations {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'user_informations_id' })
  userInformationsId: string;

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

  @ManyToOne(() => User, (user) => user.userInformations)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;
}
