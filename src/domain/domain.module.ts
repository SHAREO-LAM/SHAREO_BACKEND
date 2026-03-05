import { Module } from '@nestjs/common';
import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';
import { Domain } from 'src/entities/entities/Domain';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AvailabilityService } from './availability.service';
import { OrderItemService } from 'src/order_item/order_item.service';
import { OrderItem } from 'src/entities/entities/OrderItem';

@Module({
  imports: [TypeOrmModule.forFeature([Domain, OrderItem])],
  controllers: [DomainController],
  providers: [DomainService, AvailabilityService, OrderItemService],
})
export class DomainModule {}
