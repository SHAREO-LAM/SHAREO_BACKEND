import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from './Users';
import { UserOrderInformations } from './UserOrderInformations';

@Index('user_informations_pkey', ['userInformationsId'], { unique: true })
@Entity('user_informations', { schema: 'public' })
export class UserInformations {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'user_informations_id' })
  userInformationsId: string;

  @Column('bigint', { name: 'user_id' })
  userId: string;

  @ApiPropertyOptional({ description: "Prénom" })
  @Column('varchar', { name: 'name', length: 255, nullable: true })
  name: string | null;

  @ApiPropertyOptional({ description: "Nom de famille" })
  @Column('varchar', { name: 'last_name', length: 255, nullable: true })
  lastName: string | null;

  @Column('varchar', { name: 'street_name', length: 255, nullable: true })
  streetName: string | null;

  @Column('varchar', { name: 'street_name_add', length: 255, nullable: true })
  streetNameAdd: string | null;

  @Column('bigint', { name: 'house_number', nullable: true })
  houseNumber: string | null;

  @Column('varchar', { name: 'postcode', length: 255, nullable: true })
  postcode: string | null;

  @Column('varchar', { name: 'city', length: 255, nullable: true })
  city: string | null;

  @Column('varchar', { name: 'country', length: 255, nullable: true })
  country: string | null;

  @Column('varchar', { name: 'phone', length: 255, nullable: true })
  phone: string | null;

  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @ApiProperty({ type: () => User, description: "Utilisateur associé" })
  @ManyToOne(() => User, (user) => user.userInformations)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;

  @ApiProperty({ type: () => UserOrderInformations, isArray: true, description: "Commandes liées à ces informations utilisateur" })
  @OneToMany(() => UserOrderInformations, (userOrderInformations) => userOrderInformations.userInformations)
  userOrderInformations: UserOrderInformations[];
}