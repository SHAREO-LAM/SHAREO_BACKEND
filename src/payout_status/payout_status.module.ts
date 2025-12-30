import { Module } from '@nestjs/common';
import { PayoutStatusService } from './payout_status.service';
import { PayoutStatusController } from './payout_status.controller';
import { PayoutStatus } from 'src/entities/entities/PayoutStatus';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([PayoutStatus])],
  controllers: [PayoutStatusController],
  providers: [PayoutStatusService],
})
export class PayoutStatusModule {}
