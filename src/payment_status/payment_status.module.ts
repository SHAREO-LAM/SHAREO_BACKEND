import { Module } from '@nestjs/common';
import { PaymentStatusService } from './payment_status.service';
import { PaymentStatusController } from './payment_status.controller';
import { PaymentStatus } from 'src/entities/entities/PaymentStatus';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentStatus])],
  controllers: [PaymentStatusController],
  providers: [PaymentStatusService],
})
export class PaymentStatusModule {}
