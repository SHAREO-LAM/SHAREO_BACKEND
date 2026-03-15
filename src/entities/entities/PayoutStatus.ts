import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyPayout } from './CompanyPayout';

@Index('payout_status_pkey', ['payoutStatusId'], { unique: true })
@Entity('payout_status', { schema: 'public' })
export class PayoutStatus {
  @ApiProperty({ description: 'ID du statut de payout' })
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'payout_status_id' })
  payoutStatusId: string;

  @ApiProperty({ description: 'Code du statut de payout' })
  @Column('varchar', { name: 'code', length: 255 })
  code: string;

  @ApiProperty({ description: 'Nom du statut de payout' })
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @ApiProperty({ description: 'Date de création du statut de payout' })
  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @ApiProperty({ description: 'Date de mise à jour du statut de payout' })
  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @ApiProperty({ description: 'ID utilisateur créateur du statut de payout' })
  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @ApiProperty({ description: 'ID utilisateur mise à jour du statut de payout' })
  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @ApiProperty({ type: () => [CompanyPayout], description: 'Liste des payouts associés à ce statut' })
  @OneToMany(() => CompanyPayout, (companyPayout) => companyPayout.payoutStatus)
  companyPayouts: CompanyPayout[];
}