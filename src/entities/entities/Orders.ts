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
import { OrderStatus } from './OrderStatus';
import { User } from './Users';
import { OrderItem } from './OrderItem';
import { Payment } from './Payment';
import { UserOrderInformations } from './UserOrderInformations';

@Index('orders_pkey', ['orderId'], { unique: true })
@Entity('orders', { schema: 'public' })
export class Order {
  @ApiProperty({ description: 'ID de la commande' })
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'order_id' })
  orderId: string;

  @ApiProperty({ description: 'Date de création de la commande' })
  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @ApiPropertyOptional({ description: 'Date de mise à jour de la commande' })
  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @ApiPropertyOptional({ description: 'ID de l’utilisateur ayant créé la commande' })
  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @ApiPropertyOptional({ description: 'ID de l’utilisateur ayant mis à jour la commande' })
  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @ApiProperty({ description: 'ID du statut de la commande' })
  @Column('bigint', { name: 'status_id' })
  statusId: string;

  @ApiProperty({ description: 'ID de l’utilisateur' })
  @Column('bigint', { name: 'user_id' })
  userId: string;

  @ApiProperty({ type: () => OrderStatus, description: 'Statut de la commande' })
  @ManyToOne(() => OrderStatus, (orderStatus) => orderStatus.orders)
  @JoinColumn([{ name: 'status_id', referencedColumnName: 'orderStatusId' }])
  status: OrderStatus;

  @ApiProperty({ type: () => User, description: 'Utilisateur ayant passé la commande' })
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;

  @ApiProperty({ type: () => [OrderItem], description: 'Liste des items de la commande' })
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @ApiProperty({ type: () => [Payment], description: 'Liste des paiements associés' })
  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @ApiProperty({ type: () => [UserOrderInformations], description: 'Informations supplémentaires de la commande' })
  @OneToMany(() => UserOrderInformations, (userOrderInformations) => userOrderInformations.order)
  userOrderInformations: UserOrderInformations[];
}