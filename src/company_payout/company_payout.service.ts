import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { CompanyPayout } from 'src/entities/entities/CompanyPayout';
import { OrderItem } from 'src/entities/entities/OrderItem';

import { BaseService } from 'src/common/base.service';

@Injectable()
export class CompanyPayoutService extends BaseService<CompanyPayout> {
  constructor(
    @InjectRepository(CompanyPayout)
    private readonly companyPayoutRepo: Repository<CompanyPayout>,
    private readonly dataSource: DataSource,
  ) {
    super(companyPayoutRepo);
  }

  async createPayoutsForOrder(
    orderId: string,
    manager: EntityManager,
  ): Promise<CompanyPayout[]> {
    const orderItems = await manager.find(OrderItem, {
      where: { orderId },
      relations: ['equipementCompany', 'domain'],
    });

    if (!orderItems.length) {
      throw new BadRequestException('No order items found');
    }

    const payouts: CompanyPayout[] = [];

    for (const item of orderItems) {
      const gross = item.unitPrice * Number(item.quantity);

      const companyId =
        item.equipementCompany?.companyId ?? item.domain?.companyId;

      if (!companyId) {
        throw new BadRequestException(
          `No company found for orderItem ${item.orderItemId}`,
        );
      }

      const payout = manager.create(CompanyPayout, {
        orderItemId: item.orderItemId,
        companyId,
        amount: gross,
        payoutStatusId: '1',
        datetimeCreate: new Date().toISOString(),
        userCreateId: '2',
      });

      payouts.push(payout);
    }

    await manager.save(CompanyPayout, payouts);

    return payouts;
  }

  findOneById(id: number | string) {
    return super.findOne(id, 'companyPayoutId');
  }

  updateById(id: number | string, dto: Partial<CompanyPayout>) {
    return super.update(id, dto, 'companyPayoutId');
  }

  removeById(id: number | string) {
    return super.remove(id, 'companyPayoutId');
  }
}
