import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Order } from '../entities/entities/Orders';
import { OrderItem } from '../entities/entities/OrderItem';
import { Payment } from '../entities/entities/Payment';

import { CreateCheckoutDto, CheckoutItemType } from './dto/create-checkout.dto';

@Injectable()
export class CheckoutService {
  private readonly COMMISSION_RATE = 0.01;

  constructor(private readonly dataSource: DataSource) {}

  async createCheckout(dto: CreateCheckoutDto) {
    try {
      return await this.dataSource.transaction(async (manager) => {
        let subtotal = 0;

        const order = manager.create(Order, {
          statusId: '1',
          userId: '2', // TODO: JWT
          datetimeCreate: new Date().toISOString(),
          userCreateId: '2',
        });

        const savedOrder = await manager.save(Order, order);

        const orderItems: OrderItem[] = [];

        for (const item of dto.items) {
          const quantity = Number(item.quantity ?? 1);
          const lineTotal = item.unitPrice * quantity;

          subtotal += lineTotal;

          const orderItem = new OrderItem();
          orderItem.order = savedOrder;

          if (item.type === CheckoutItemType.DOMAIN) {
            orderItem.domainId = item.productId;
          } else if (item.type === CheckoutItemType.EQUIPMENT) {
            orderItem.equipementCompanyId = item.productId;
          }

          orderItem.quantity = String(quantity);
          if (!item.startDate || !item.endDate) {
            throw new BadRequestException(
              'startDate and endDate are required for all items',
            );
          }
          orderItem.startDate = item.startDate;
          orderItem.endDate = item.endDate;
          orderItem.unitPrice = item.unitPrice;
          orderItem.datetimeCreate = new Date().toISOString();
          orderItem.userCreateId = '2';

          orderItems.push(orderItem);
        }

        await manager.save(OrderItem, orderItems);

        // Caclul commission
        const commission = Number((subtotal * this.COMMISSION_RATE).toFixed(2));
        const total = Number((subtotal + commission).toFixed(2));

        const payment = manager.create(Payment, {
          amount: total,
          provider: 'stripe',
          datetimeCreate: new Date().toISOString(),
          userCreateId: '2',
          orderId: savedOrder.orderId,
          paymentStatusId: '1', // Pending
        });

        const savedPayment = await manager.save(Payment, payment);

        return {
          orderId: savedOrder.orderId,
          paymentId: savedPayment.paymentId,
          subtotal,
          commission,
          commissionRate: this.COMMISSION_RATE,
          total,
        };
      });
    } catch (error) {
      console.error('Checkout failed:', error);
      throw new BadRequestException('Checkout failed. Please try again.');
    }
  }
}
