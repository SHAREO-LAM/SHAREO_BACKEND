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
import { OrderItem } from './OrderItem';

@Index('domain_pkey', ['domainId'], { unique: true })
@Entity('domain', { schema: 'public' })
export class Domain {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'domain_id' })
  domainId: string;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column('character varying', {
    name: 'street_name',
    nullable: true,
    length: 255,
  })
  streetName: string | null;

  @Column('character varying', {
    name: 'street_name_add',
    nullable: true,
    length: 255,
  })
  streetNameAdd: string | null;

  @Column('bigint', { name: 'house_number', nullable: true })
  houseNumber: string | null;

  @Column('character varying', {
    name: 'postcode',
    nullable: true,
    length: 255,
  })
  postcode: string | null;

  @Column('character varying', { name: 'city', nullable: true, length: 255 })
  city: string | null;

  @Column('character varying', { name: 'country', nullable: true, length: 255 })
  country: string | null;

  @Column('double precision', {
    name: 'latitude',
    nullable: true,
    precision: 53,
  })
  latitude: number | null;

  @Column('double precision', {
    name: 'longitude',
    nullable: true,
    precision: 53,
  })
  longitude: number | null;

  @Column('double precision', {
    name: 'price_per_day',
    nullable: true,
    precision: 53,
  })
  pricePerDay: number | null;

  @Column('bigint', { name: 'capacity', nullable: true })
  capacity: string | null;

  @Column('character varying', {
    name: 'image_url',
    nullable: true,
    length: 255,
  })
  imageUrl: string | null;

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

  @ManyToOne(() => Company, (company) => company.domains)
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'companyId' }])
  company: Company;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.domain)
  orderItems: OrderItem[];
}
