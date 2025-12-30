import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './Company';
import { OrderItem } from './OrderItem';
import { PayoutStatus } from './PayoutStatus';

@Index('company_payout_pkey', ['companyPayoutId'], { unique: true })
@Entity('company_payout', { schema: 'public' })
export class CompanyPayout {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'company_payout_id' })
  companyPayoutId: string;

  @Column('double precision', { name: 'amount', precision: 53 })
  amount: number;

  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @Column('bigint', { name: 'company_id', nullable: true })
  companyId: string;

  @Column('bigint', { name: 'order_item_id', nullable: true })
  orderItemId: string;

  @Column('bigint', { name: 'payout_status_id', nullable: true })
  payoutStatusId: string;

  @ManyToOne(() => Company, (company) => company.companyPayouts)
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'companyId' }])
  company: Company;

  @ManyToOne(() => OrderItem, (orderItem) => orderItem.companyPayouts)
  @JoinColumn([{ name: 'order_item_id', referencedColumnName: 'orderItemId' }])
  orderItem: OrderItem;

  @ManyToOne(() => PayoutStatus, (payoutStatus) => payoutStatus.companyPayouts)
  @JoinColumn([
    { name: 'payout_status_id', referencedColumnName: 'payoutStatusId' },
  ])
  payoutStatus: PayoutStatus;
}
