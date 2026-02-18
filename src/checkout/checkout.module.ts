import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { Order } from 'src/entities/entities/Orders';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { OrderItem } from 'src/entities/entities/OrderItem';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
