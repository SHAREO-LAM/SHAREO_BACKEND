import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './Company';
import { User } from './Users';

@Index('user_company_pkey', ['userCompanyId'], { unique: true })
@Entity('user_company', { schema: 'public' })
export class UserCompany {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'user_company_id' })
  userCompanyId: string;

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

  @Column('bigint', { name: 'user_id', nullable: true })
  userId: string;

  @ManyToOne(() => Company, (company) => company.userCompanies)
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'companyId' }])
  company: Company;

  @ManyToOne(() => User, (user) => user.userCompanies)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: User;
}
