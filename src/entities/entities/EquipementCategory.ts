import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EquipementType } from './EquipementType';

@Index('equipement_category_pkey', ['equipementCategoryId'], { unique: true })
@Entity('equipement_category', { schema: 'public' })
export class EquipementCategory {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'equipement_category_id' })
  equipementCategoryId: string;

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

  @OneToMany(
    () => EquipementType,
    (equipementType) => equipementType.equipementCategory,
  )
  equipementTypes: EquipementType[];
}
