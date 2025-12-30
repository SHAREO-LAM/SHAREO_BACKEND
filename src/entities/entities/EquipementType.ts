import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EquipementCompany } from './EquipementCompany';
import { EquipementCategory } from './EquipementCategory';

@Index('equipement_type_pkey', ['equipementTypeId'], { unique: true })
@Entity('equipement_type', { schema: 'public' })
export class EquipementType {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'equipement_type_id' })
  equipementTypeId: string;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('character varying', { name: 'code', length: 255 })
  code: string;

  @Column('date', { name: 'datetime_create', default: () => 'CURRENT_DATE' })
  datetimeCreate: string;

  @Column('date', { name: 'datetime_update', nullable: true })
  datetimeUpdate: string | null;

  @Column('bigint', { name: 'user_create_id', nullable: true })
  userCreateId: string | null;

  @Column('bigint', { name: 'user_update_id', nullable: true })
  userUpdateId: string | null;

  @Column('bigint', { name: 'equipement_category_id', nullable: true })
  equipementCategoryId: string;

  @OneToMany(
    () => EquipementCompany,
    (equipementCompany) => equipementCompany.equipementType,
  )
  equipementCompanies: EquipementCompany[];

  @ManyToOne(
    () => EquipementCategory,
    (equipementCategory) => equipementCategory.equipementTypes,
  )
  @JoinColumn([
    {
      name: 'equipement_category_id',
      referencedColumnName: 'equipementCategoryId',
    },
  ])
  equipementCategory: EquipementCategory;
}
