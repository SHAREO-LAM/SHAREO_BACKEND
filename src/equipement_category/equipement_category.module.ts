import { Module } from '@nestjs/common';
import { EquipementCategoryService } from './equipement_category.service';
import { EquipementCategoryController } from './equipement_category.controller';
import { EquipementCategory } from 'src/entities/entities/EquipementCategory';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([EquipementCategory])],
  controllers: [EquipementCategoryController],
  providers: [EquipementCategoryService],
})
export class EquipementCategoryModule {}
