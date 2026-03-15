import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from 'src/entities/entities/Orders';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { OrderItem } from 'src/entities/entities/OrderItem';
import { Payment } from 'src/entities/entities/Payment';
import { CompanyPayout } from 'src/entities/entities/CompanyPayout';
import { UserOrderInformations } from 'src/entities/entities/UserOrderInformations';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      Payment,
      CompanyPayout,
      UserOrderInformations,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
