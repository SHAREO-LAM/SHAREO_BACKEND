import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './Company';
import { EquipementType } from './EquipementType';
import { OrderItem } from './OrderItem';

@Index('equipement_company_pkey', ['equipementCompanyId'], { unique: true })
@Entity('equipement_company', { schema: 'public' })
export class EquipementCompany {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'equipement_company_id' })
  equipementCompanyId: string;

  @Column('character varying', { name: 'display_name', length: 255 })
  displayName: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column('double precision', { name: 'price_per_day', precision: 53 })
  pricePerDay: number;

  @Column('bigint', { name: 'stock' })
  stock: string;

  @Column('character varying', {
    name: 'image_url',
    nullable: true,
    length: 255,
  })
  imageUrl: string | null;

  @Column('jsonb', { name: 'image_urls', nullable: true, default: () => "'[]'" })
  imageUrls: string[] | null;

  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @Column('timestamp', { name: 'datetime_deleted', nullable: true })
  datetimeDeleted?: Date | null;

  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @Column('bigint', { name: 'company_id', nullable: true })
  companyId: string;

  @Column('bigint', { name: 'equipement_type_id', nullable: true })
  equipementTypeId: string;

  @ManyToOne(() => Company, (company) => company.equipementCompanies)
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'companyId' }])
  company: Company;

  @ManyToOne(
    () => EquipementType,
    (equipementType) => equipementType.equipementCompanies,
  )
  @JoinColumn([
    { name: 'equipement_type_id', referencedColumnName: 'equipementTypeId' },
  ])
  equipementType: EquipementType;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.equipementCompany)
  orderItems: OrderItem[];
}
