import { Module } from '@nestjs/common';
import { UserCompanyService } from './user_company.service';
import { UserCompanyController } from './user_company.controller';
import { UserCompany } from 'src/entities/entities/UserCompany';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserCompany])],
  controllers: [UserCompanyController],
  providers: [UserCompanyService],
})
export class UserCompanyModule {}
