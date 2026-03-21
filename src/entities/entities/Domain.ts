import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'ID du domaine', type: String })
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'domain_id' })
  domainId: string;

  @ApiProperty({ description: 'Nom du domaine', type: String})
  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @ApiPropertyOptional({ description: 'Description du domaine', type: String, nullable: true })
  @Column('character varying', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @ApiPropertyOptional({ description: 'Nom de la rue', type: String, nullable: true })
  @Column('character varying', { name: 'street_name', nullable: true, length: 255 })
  streetName: string | null;

  @ApiPropertyOptional({ description: 'Complément de rue', type: String, nullable: true })
  @Column('character varying', { name: 'street_name_add', nullable: true, length: 255 })
  streetNameAdd: string | null;

  @ApiPropertyOptional({ description: 'Numéro de la maison', type: String, nullable: true })
  @Column('bigint', { name: 'house_number', nullable: true })
  houseNumber: string | null;

  @ApiPropertyOptional({ description: 'Code postal', type: String, nullable: true })
  @Column('character varying', { name: 'postcode', nullable: true, length: 255 })
  postcode: string | null;

  @ApiPropertyOptional({ description: 'Ville', type: String, nullable: true })
  @Column('varchar', { name: 'city', nullable: true, length: 100 })
  city: string | null;

  @ApiPropertyOptional({ description: 'Pays', type: String, nullable: true }) 
  @Column('varchar', { name: 'country', nullable: true, length: 100 })
  country: string | null;

  @ApiPropertyOptional({ description: 'Latitude', type: Number, nullable: true })
  @Column('double precision', { name: 'latitude', nullable: true, precision: 53 })
  latitude: number | null;

  @ApiPropertyOptional({ description: 'Longitude', type: Number, nullable: true })
  @Column('double precision', { name: 'longitude', nullable: true, precision: 53 })
  longitude: number | null;

  @ApiPropertyOptional({ description: 'Prix par jour', type: Number, nullable: true })
  @Column('double precision', { name: 'price_per_day', nullable: true, precision: 53 })
  pricePerDay: number | null;

  @ApiPropertyOptional({ description: 'Capacité', type: String, nullable: true })
  @Column('bigint', { name: 'capacity', nullable: true })
  capacity: string | null;

  @ApiPropertyOptional({ description: 'URL de l’image', type: String, nullable: true })
  @Column('varchar', { name: 'image_url', nullable: true, length: 255 })
  imageUrl: string | null;

  @ApiPropertyOptional({
    description: 'URLs des images (max 5)',
    type: [String],
    nullable: true,
  })
  @Column('jsonb', { name: 'image_urls', nullable: true, default: () => "'[]'" })
  imageUrls: string[] | null;

  @ApiProperty({ description: 'Date de création', type: String, format: 'date' })
  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @ApiPropertyOptional({ description: 'Date de mise à jour', type: String, format: 'date', nullable: true })
  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @ApiPropertyOptional({ description: 'ID de l’utilisateur créateur', type: String, nullable: true })
  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @ApiPropertyOptional({ description: 'ID de l’utilisateur mise à jour', type: String, nullable: true })
  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @ApiPropertyOptional({ description: 'ID de la société', type: String })
  @Column('bigint', { name: 'company_id', nullable: true })
  companyId: string;

  @ApiPropertyOptional({ type: () => Company })
  @ManyToOne(() => Company, (company) => company.domains)
  @JoinColumn([{ name: 'company_id', referencedColumnName: 'companyId' }])
  company: Company;

  @ApiPropertyOptional({ type: () => [OrderItem] })
  @OneToMany(() => OrderItem, (orderItem) => orderItem.domain)
  orderItems: OrderItem[];
}