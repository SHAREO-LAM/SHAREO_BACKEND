import { Injectable } from '@nestjs/common';
import { Order } from 'src/entities/entities/Orders';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { CompanyPayout } from 'src/entities/entities/CompanyPayout';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(CompanyPayout)
    private readonly companyPayoutRepository: Repository<CompanyPayout>,
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

  ordersByUserIdWithItems(userId: number | string) {
    return this.orderRepo.find({
      where: { userId: String(userId) },
      relations: {
        status: true,
        orderItems: {
          domain: {
            company: true,
          },
          equipementCompany: {
            company: true,
          },
        },
      },
      order: {
        datetimeCreate: 'DESC',
      },
    });
  }

   
 // order.service.ts

async getOrdersByCompany(companyId: number) {
  return this.orderRepo
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.status', 'status')
    .leftJoinAndSelect('order.user', 'user')
    .leftJoinAndSelect('order.orderItems', 'orderItem')
    .leftJoinAndSelect('orderItem.domain', 'domain')
    .leftJoinAndSelect('orderItem.equipementCompany', 'equipementCompany')
    .leftJoinAndSelect('equipementCompany.equipementType', 'equipementType')
    .leftJoinAndSelect('orderItem.companyPayouts', 'companyPayouts')
    .leftJoinAndSelect('companyPayouts.payoutStatus', 'payoutStatus')
    .leftJoinAndSelect('order.payments', 'payments')
    .leftJoinAndSelect('order.userOrderInformations', 'userOrderInformations')
    .where('equipementCompany.company_id = :companyId', { companyId })
    .orderBy('order.datetime_create', 'DESC')
    .getMany();
}
}
