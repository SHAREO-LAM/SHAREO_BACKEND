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
import { CompanyPayout } from './CompanyPayout';
import { Domain } from './Domain';
import { EquipementCompany } from './EquipementCompany';
import { Order } from './Orders';

@Index('order_item_pkey', ['orderItemId'], { unique: true })
@Entity('order_item', { schema: 'public' })
export class OrderItem {
  @ApiProperty({ description: 'ID de l’item de commande' })
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'order_item_id' })
  orderItemId: string;

  @ApiProperty({ description: 'Quantité' })
  @Column('bigint', { name: 'quantity' })
  quantity: string;

  @ApiProperty({ description: 'Date de début' })
  @Column('date', { name: 'start_date' })
  startDate: string;

  @ApiProperty({ description: 'Date de fin' })
  @Column('date', { name: 'end_date' })
  endDate: string;

  @ApiProperty({ description: 'Prix unitaire' })
  @Column('double precision', { name: 'unit_price', precision: 53 })
  unitPrice: number;

  @ApiProperty({ description: 'Date de création' })
  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @ApiPropertyOptional({ description: 'Date de mise à jour' })
  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @ApiPropertyOptional({ description: 'ID utilisateur créateur' })
  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @ApiPropertyOptional({ description: 'ID utilisateur mise à jour' })
  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @ApiPropertyOptional({ description: 'ID du domaine associé' })
  @Column('bigint', { name: 'domain_id', nullable: true })
  domainId: string;

  @ApiPropertyOptional({ description: 'ID de l’équipement associé' })
  @Column('bigint', { name: 'equipement_company_id', nullable: true })
  equipementCompanyId: string;

  @ApiPropertyOptional({ description: 'ID de la commande' })
  @Column('bigint', { name: 'order_id', nullable: true })
  orderId: string;

  @ApiProperty({ type: () => [CompanyPayout], description: 'Payouts associés à cet item' })
  @OneToMany(() => CompanyPayout, (companyPayout) => companyPayout.orderItem)
  companyPayouts: CompanyPayout[];

  @ApiPropertyOptional({ type: () => Domain, description: 'Domaine associé' })
  @ManyToOne(() => Domain, (domain) => domain.orderItems)
  @JoinColumn([{ name: 'domain_id', referencedColumnName: 'domainId' }])
  domain: Domain;

  @ApiPropertyOptional({ type: () => EquipementCompany, description: 'Équipement associé' })
  @ManyToOne(() => EquipementCompany, (equipementCompany) => equipementCompany.orderItems)
  @JoinColumn([{ name: 'equipement_company_id', referencedColumnName: 'equipementCompanyId' }])
  equipementCompany: EquipementCompany;

  @ApiProperty({ type: () => Order, description: 'Commande parente' })
  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'orderId' }])
  order: Order;
}