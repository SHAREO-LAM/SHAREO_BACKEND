import { Injectable } from '@nestjs/common';
import { Payment } from 'src/entities/entities/Payment';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService extends BaseService<Payment> {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {
    super(paymentRepo);
  }

  findOneById(id: number | string) {
    return super.findOne(id, 'paymentId');
  }

  updateById(id: number | string, dto: Partial<Payment>) {
    return super.update(id, dto, 'paymentId');
  }

  removeById(id: number | string) {
    return super.remove(id, 'paymentId');
  }
}
