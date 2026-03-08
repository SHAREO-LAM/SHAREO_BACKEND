import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyPayout } from './CompanyPayout';
import { Domain } from './Domain';
import { EquipementCompany } from './EquipementCompany';
import { Order } from './Orders';

@Index('order_item_pkey', ['orderItemId'], { unique: true })
@Entity('order_item', { schema: 'public' })
export class OrderItem {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'order_item_id' })
  orderItemId: string;

  @Column('bigint', { name: 'quantity' })
  quantity: string;

  @Column('date', { name: 'start_date' })
  startDate: string;

  @Column('date', { name: 'end_date' })
  endDate: string;

  @Column('double precision', { name: 'unit_price', precision: 53 })
  unitPrice: number;

  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @Column('date', { name: 'datetime_delete', nullable: true })
  datetimeDelete: string | null;

  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @Column('bigint', { name: 'domain_id', nullable: true })
  domainId: string;

  @Column('bigint', { name: 'equipement_company_id', nullable: true })
  equipementCompanyId: string;

  @Column('bigint', { name: 'order_id', nullable: true })
  orderId: string;

  @OneToMany(() => CompanyPayout, (companyPayout) => companyPayout.orderItem)
  companyPayouts: CompanyPayout[];

  @ManyToOne(() => Domain, (domain) => domain.orderItems)
  @JoinColumn([{ name: 'domain_id', referencedColumnName: 'domainId' }])
  domain: Domain;

  @ManyToOne(
    () => EquipementCompany,
    (equipementCompany) => equipementCompany.orderItems,
  )
  @JoinColumn([
    {
      name: 'equipement_company_id',
      referencedColumnName: 'equipementCompanyId',
    },
  ])
  equipementCompany: EquipementCompany;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'orderId' }])
  order: Order;
}
