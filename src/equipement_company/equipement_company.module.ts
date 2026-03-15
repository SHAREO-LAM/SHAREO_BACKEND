import { Module } from '@nestjs/common';
import { EquipementCompanyService } from './equipement_company.service';
import { EquipementCompanyController } from './equipement_company.controller';
import { EquipementCompany } from 'src/entities/entities/EquipementCompany';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { OrderItem } from 'src/entities/entities/OrderItem';
import { CompanyPayout } from 'src/entities/entities/CompanyPayout';
import { AvailabilityService } from './availability.service';
import { OrderItemService } from 'src/order_item/order_item.service';

@Module({
  imports: [TypeOrmModule.forFeature([EquipementCompany, OrderItem, CompanyPayout])],
  controllers: [EquipementCompanyController],
  providers: [EquipementCompanyService, AvailabilityService, OrderItemService],
})
export class EquipementCompanyModule {}
