import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from 'src/entities/entities/Payment';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { CompanyPayoutModule } from 'src/company_payout/company_payout.module';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), CompanyPayoutModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
