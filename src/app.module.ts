import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserInformationsModule } from './user_informations/user_informations.module';
import { CompanyModule } from './company/company.module';
import { UserCompanyModule } from './user_company/user_company.module';
import { DomainModule } from './domain/domain.module';
import { EquipementCategoryModule } from './equipement_category/equipement_category.module';
import { EquipementTypeModule } from './equipement_type/equipement_type.module';
import { EquipementCompanyModule } from './equipement_company/equipement_company.module';
import { OrderStatusModule } from './order_status/order_status.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order_item/order_item.module';
import { PaymentStatusModule } from './payment_status/payment_status.module';
import { PaymentModule } from './payment/payment.module';
import { PayoutStatusModule } from './payout_status/payout_status.module';
import { CompanyPayoutModule } from './company_payout/company_payout.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'shareo',
      autoLoadEntities: true,
      synchronize: false,
      logging: ['query', 'error'],
    }),
    UserModule,
    UserInformationsModule,
    CompanyModule,
    UserCompanyModule,
    DomainModule,
    EquipementCategoryModule,
    EquipementTypeModule,
    EquipementCompanyModule,
    OrderStatusModule,
    OrderModule,
    OrderItemModule,
    PaymentStatusModule,
    PaymentModule,
    PayoutStatusModule,
    CompanyPayoutModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
