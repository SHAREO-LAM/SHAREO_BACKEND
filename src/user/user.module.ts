import { Module } from '@nestjs/common';
import { User } from '../entities/entities/Users';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UserCompany } from 'src/entities/entities/UserCompany';
import { UserInformations } from 'src/entities/entities/UserInformations';
import { UserOrderInformations } from 'src/entities/entities/UserOrderInformations';
import { Order } from 'src/entities/entities/Orders';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserCompany,
      UserInformations,
      UserOrderInformations,
      Order,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
