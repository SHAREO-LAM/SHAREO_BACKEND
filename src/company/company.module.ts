import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Company } from 'src/entities/entities/Company';
import { Domain } from 'src/entities/entities/Domain';
import { EquipementCompany } from 'src/entities/entities/EquipementCompany';
import { UserCompany } from 'src/entities/entities/UserCompany';
import { CompanyPayout } from 'src/entities/entities/CompanyPayout';
import { OrderItem } from 'src/entities/entities/OrderItem';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Company,
      Domain,
      EquipementCompany,
      UserCompany,
      CompanyPayout,
      OrderItem,
    ]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
