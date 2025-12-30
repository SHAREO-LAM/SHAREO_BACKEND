import { Module } from '@nestjs/common';
import { EquipementTypeService } from './equipement_type.service';
import { EquipementTypeController } from './equipement_type.controller';
import { EquipementType } from 'src/entities/entities/EquipementType';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([EquipementType])],
  controllers: [EquipementTypeController],
  providers: [EquipementTypeService],
})
export class EquipementTypeModule {}
