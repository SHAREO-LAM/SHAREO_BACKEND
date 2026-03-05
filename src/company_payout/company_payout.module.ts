import { Module } from '@nestjs/common';
import { CompanyPayoutService } from './company_payout.service';
import { CompanyPayoutController } from './company_payout.controller';
import { CompanyPayout } from 'src/entities/entities/CompanyPayout';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyPayout])],
  controllers: [CompanyPayoutController],
  providers: [CompanyPayoutService],
  exports: [CompanyPayoutService],
})
export class CompanyPayoutModule {}
