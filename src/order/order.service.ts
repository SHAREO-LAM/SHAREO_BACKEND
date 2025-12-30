import { Injectable } from '@nestjs/common';
import { Order } from 'src/entities/entities/Orders';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {
    super(orderRepo);
  }

  findOneById(id: number | string) {
    return super.findOne(id, 'orderId');
  }

  updateById(id: number | string, dto: Partial<Order>) {
    return super.update(id, dto, 'orderId');
  }

  removeById(id: number | string) {
    return super.remove(id, 'orderId');
  }
}
