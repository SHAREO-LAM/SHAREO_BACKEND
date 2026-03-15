import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from './Users';
import { UserInformations } from './UserInformations';
import { Order } from './Orders';

@Index('user_order_informations_pkey', ['userOrderInformationsId'], { unique: true })
@Entity('user_order_informations', { schema: 'public' })
export class UserOrderInformations {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'user_order_informations_id' })
  userOrderInformationsId: string;

  @Column('bigint', { name: 'user_id' })
  userId: string;

  @Column('bigint', { name: 'user_informations_id', nullable: true })
  userInformationsId: string | null;

  @ApiProperty({ description: 'ID de la commande associée' })
  @Column('bigint', { name: 'order_id' })
  orderId: string;

  @ApiPropertyOptional({ description: 'Prénom de l’utilisateur' })
  @Column('varchar', { name: 'name', length: 255, nullable: true })
  name: string | null;

  @ApiPropertyOptional({ description: 'Nom de famille de l’utilisateur' })
  @Column('varchar', { name: 'last_name', length: 255, nullable: true })
  lastName: string | null;

  @ApiPropertyOptional({ description: 'Adresse – rue principale' })
  @Column('varchar', { name: 'street_name', length: 255, nullable: true })
  streetName: string | null;

  @ApiPropertyOptional({ description: 'Adresse – complément de rue' })
  @Column('varchar', { name: 'street_name_add', length: 255, nullable: true })
  streetNameAdd: string | null;

  @ApiPropertyOptional({ description: 'Numéro de maison' })
  @Column('bigint', { name: 'house_number', nullable: true })
  houseNumber: string | null;

  @ApiPropertyOptional({ description: 'Code postal' })
  @Column('varchar', { name: 'postcode', length: 255, nullable: true })
  postcode: string | null;

  @ApiPropertyOptional({ description: 'Ville' })
  @Column('varchar', { name: 'city', length: 255, nullable: true })
  city: string | null;

  @ApiPropertyOptional({ description: 'Pays' })
  @Column('varchar', { name: 'country', length: 255, nullable: true })
  country: string | null;

  @ApiPropertyOptional({ description: 'Téléphone' })
  @Column('varchar', { name: 'phone', length: 255, nullable: true })
  phone: string | null;

  @ApiProperty({ description: 'Date de création de l’enregistrement' })
  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @ApiPropertyOptional({ description: 'Date de mise à jour de l’enregistrement' })
  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @ManyToOne(() => User, (user) => user.userOrderInformations)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;

  @ManyToOne(() => UserInformations, (userInfo) => userInfo.userOrderInformations)
  @JoinColumn([{ name: 'user_informations_id', referencedColumnName: 'userInformationsId' }])
  userInformations: UserInformations;

  @ApiProperty({ type: () => Order, description: 'Commande associée' })
  @ManyToOne(() => Order, (order) => order.userOrderInformations)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'orderId' }])
  order: Order;
}