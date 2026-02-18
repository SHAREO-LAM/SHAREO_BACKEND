import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Payment } from 'src/entities/entities/Payment';
import { Order } from 'src/entities/entities/Orders';
import { CompanyPayoutService } from 'src/company_payout/company_payout.service';

import { BaseService } from 'src/common/base.service';

@Injectable()
export class PaymentService extends BaseService<Payment> {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,

    private readonly dataSource: DataSource,

    private readonly companyPayoutService: CompanyPayoutService,
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

  async confirmPayment(paymentId: string) {
    console.log(`Confirming payment with ID: ${paymentId}`);
    return await this.dataSource.transaction(async (manager) => {
      // Récupérer le paiement
      const payment = await manager.findOne(Payment, {
        where: { paymentId },
      });

      if (!payment) {
        throw new BadRequestException('Payment not found');
      }

      if (payment.paymentStatusId === '2') {
        throw new BadRequestException('Payment already confirmed');
      }

      // Mettre à jour le paiement
      payment.paymentStatusId = '2';
      payment.datetimeUpdate = new Date().toISOString();

      await manager.save(payment);

      // Mettre à jour la commande associée
      await manager.update(
        Order,
        { orderId: payment.orderId },
        {
          statusId: '2', // confirmed
          datetimeUpdate: new Date().toISOString(),
        },
      );

      // Créer les payouts
      const payouts = await this.companyPayoutService.createPayoutsForOrder(
        payment.orderId,
        manager,
      );

      return {
        message: 'Payment confirmed successfully',
        paymentId: payment.paymentId,
        orderId: payment.orderId,
        payoutsCreated: payouts.length,
      };
    });
  }
}
