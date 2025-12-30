import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyPayout } from './CompanyPayout';

@Index('payout_status_pkey', ['payoutStatusId'], { unique: true })
@Entity('payout_status', { schema: 'public' })
export class PayoutStatus {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'payout_status_id' })
  payoutStatusId: string;

  @Column('character varying', { name: 'code', length: 255 })
  code: string;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @OneToMany(() => CompanyPayout, (companyPayout) => companyPayout.payoutStatus)
  companyPayouts: CompanyPayout[];
}
