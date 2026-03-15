import { Injectable } from '@nestjs/common';
import { Order } from 'src/entities/entities/Orders';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { In, Repository } from 'typeorm';
import { OrderItem } from 'src/entities/entities/OrderItem';
import { Payment } from 'src/entities/entities/Payment';
import { CompanyPayout } from 'src/entities/entities/CompanyPayout';
import { UserOrderInformations } from 'src/entities/entities/UserOrderInformations';
import { CompanyPayout } from 'src/entities/entities/CompanyPayout';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(CompanyPayout)
    private readonly companyPayoutRepo: Repository<CompanyPayout>,
    @InjectRepository(UserOrderInformations)
    private readonly userOrderInformationsRepo: Repository<UserOrderInformations>,
  ) {
    super(orderRepo);
  }

  findOneById(id: number | string) {
    return super.findOne(id, 'orderId');
  }

  updateById(id: number | string, dto: Partial<Order>) {
    return super.update(id, dto, 'orderId');
  }

  async removeById(id: number | string) {
    const orderId = String(id);
    await this.findOneById(id);

    await this.orderRepo.manager.transaction(async (manager) => {
      const orderItems = await manager.find(OrderItem, {
        select: { orderItemId: true },
        where: { orderId },
      });
      const orderItemIds = orderItems.map((item) => item.orderItemId);

      if (orderItemIds.length > 0) {
        await manager.delete(CompanyPayout, { orderItemId: In(orderItemIds) });
      }

      await manager.delete(UserOrderInformations, { orderId });
      await manager.delete(Payment, { orderId });
      await manager.delete(OrderItem, { orderId });
      await manager.delete(Order, { orderId });
    });
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
