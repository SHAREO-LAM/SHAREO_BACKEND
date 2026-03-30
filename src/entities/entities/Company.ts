import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyPayout } from './CompanyPayout';
import { Domain } from './Domain';
import { EquipementCompany } from './EquipementCompany';
import { UserCompany } from './UserCompany';
import { CompanyStatusEnum } from '../../company/enums/company-status.enum';

@Index('company_pkey', ['companyId'], { unique: true })
@Entity('company', { schema: 'public' })
export class Company {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'company_id' })
  companyId: string;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column('character varying', { name: 'siret', nullable: true, length: 255 })
  siret: string | null;

  @Column('character varying', {
    name: 'tva_number',
    nullable: true,
    length: 255,
  })
  tvaNumber: string | null;

  @Column('character varying', {
    name: 'legal_form',
    nullable: true,
    length: 255,
  })
  legalForm: string | null;

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

  @Column('character varying', {
    name: 'house_number',
    nullable: true,
    length: 255,
  })
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

  @Column('character varying', { name: 'phone', nullable: true, length: 255 })
  phone: string | null;

  @Column('character varying', { name: 'email', nullable: true, length: 255 })
  email: string | null;

  @Column('character varying', { name: 'website', nullable: true, length: 255 })
  website: string | null;

  @Column('character varying', {
    name: 'status',
    length: 255,
    default: () => "'PENDING_VALIDATION'",
  })
  status: CompanyStatusEnum;

  @Column('character varying', {
    name: 'logo_url',
    nullable: true,
    length: 255,
  })
  logoUrl: string | null;

  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @OneToMany(() => CompanyPayout, (companyPayout) => companyPayout.company)
  companyPayouts: CompanyPayout[];

  @OneToMany(() => Domain, (domain) => domain.company)
  domains: Domain[];

  @OneToMany(
    () => EquipementCompany,
    (equipementCompany) => equipementCompany.company,
  )
  equipementCompanies: EquipementCompany[];

  @OneToMany(() => UserCompany, (userCompany) => userCompany.company)
  userCompanies: UserCompany[];
}
