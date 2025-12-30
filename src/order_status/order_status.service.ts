import { Injectable } from '@nestjs/common';
import { OrderStatus } from 'src/entities/entities/OrderStatus';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrderStatusService extends BaseService<OrderStatus> {
  constructor(
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepo: Repository<OrderStatus>,
  ) {
    super(orderStatusRepo);
  }

  findOneById(id: number | string) {
    return super.findOne(id, 'orderStatusId');
  }

  updateById(id: number | string, dto: Partial<OrderStatus>) {
    return super.update(id, dto, 'orderStatusId');
  }

  removeById(id: number | string) {
    return super.remove(id, 'orderStatusId');
  }
}
