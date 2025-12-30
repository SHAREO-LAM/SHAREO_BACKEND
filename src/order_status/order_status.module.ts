import { Module } from '@nestjs/common';
import { OrderStatusService } from './order_status.service';
import { OrderStatusController } from './order_status.controller';
import { OrderStatus } from 'src/entities/entities/OrderStatus';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatus])],
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
})
export class OrderStatusModule {}
