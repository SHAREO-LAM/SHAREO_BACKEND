import { Injectable } from '@nestjs/common';
import { PayoutStatus } from 'src/entities/entities/PayoutStatus';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class PayoutStatusService extends BaseService<PayoutStatus> {
  constructor(
    @InjectRepository(PayoutStatus)
    private readonly payoutStatusRepo: Repository<PayoutStatus>,
  ) {
    super(payoutStatusRepo);
  }

  findOneById(id: number | string) {
    return super.findOne(id, 'payoutStatusId');
  }

  updateById(id: number | string, dto: Partial<PayoutStatus>) {
    return super.update(id, dto, 'payoutStatusId');
  }

  removeById(id: number | string) {
    return super.remove(id, 'payoutStatusId');
  }
}
