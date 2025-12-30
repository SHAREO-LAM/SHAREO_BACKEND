import { Injectable } from '@nestjs/common';
import { OrderItem } from 'src/entities/entities/OrderItem';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemService extends BaseService<OrderItem> {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
  ) {
    super(orderItemRepo);
  }

  findOneById(id: number | string) {
    return super.findOne(id, 'orderItemId');
  }

  updateById(id: number | string, dto: Partial<OrderItem>) {
    return super.update(id, dto, 'orderItemId');
  }

  removeById(id: number | string) {
    return super.remove(id, 'orderItemId');
  }
}
