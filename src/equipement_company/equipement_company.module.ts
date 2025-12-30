import { Module } from '@nestjs/common';
import { EquipementCompanyService } from './equipement_company.service';
import { EquipementCompanyController } from './equipement_company.controller';
import { EquipementCompany } from 'src/entities/entities/EquipementCompany';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([EquipementCompany])],
  controllers: [EquipementCompanyController],
  providers: [EquipementCompanyService],
})
export class EquipementCompanyModule {}
