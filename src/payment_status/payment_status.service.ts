import { Injectable } from '@nestjs/common';
import { PaymentStatus } from 'src/entities/entities/PaymentStatus';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentStatusService extends BaseService<PaymentStatus> {
  constructor(
    @InjectRepository(PaymentStatus)
    private readonly paymentStatusRepo: Repository<PaymentStatus>,
  ) {
    super(paymentStatusRepo);
  }

  findOneById(id: number | string) {
    return super.findOne(id, 'paymentStatusId');
  }

  updateById(id: number | string, dto: Partial<PaymentStatus>) {
    return super.update(id, dto, 'paymentStatusId');
  }

  removeById(id: number | string) {
    return super.remove(id, 'paymentStatusId');
  }
}
