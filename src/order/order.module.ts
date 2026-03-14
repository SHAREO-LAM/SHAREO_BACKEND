import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from 'src/entities/entities/Orders';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { CompanyPayoutModule } from 'src/company_payout/company_payout.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), CompanyPayoutModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [TypeOrmModule]
})
export class OrderModule {}
