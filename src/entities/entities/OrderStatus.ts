import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from './Orders';

@Index('order_status_pkey', ['orderStatusId'], { unique: true })
@Entity('order_status', { schema: 'public' })
export class OrderStatus {
  @ApiProperty({ description: 'ID du statut' })
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'order_status_id' })
  orderStatusId: string;

  @ApiProperty({ description: 'Code du statut' })
  @Column('varchar', { name: 'code', length: 255 })
  code: string;

  @ApiProperty({ description: 'Nom du statut' })
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @ApiProperty({ description: 'Date de création' })
  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @ApiPropertyOptional({ description: 'Date de mise à jour' })
  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @ApiPropertyOptional({ description: 'ID de l’utilisateur ayant créé le statut' })
  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @ApiPropertyOptional({ description: 'ID de l’utilisateur ayant mis à jour le statut' })
  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @ApiProperty({ type: () => [Order], description: 'Commandes associées à ce statut' })
  @OneToMany(() => Order, (order) => order.status)
  orders: Order[];
}