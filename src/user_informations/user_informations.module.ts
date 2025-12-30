import { Module } from '@nestjs/common';
import { UserInformationsService } from './user_informations.service';
import { UserInformations } from '../entities/entities/UserInformations';
import { UserInformationsController } from './user_informations.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserInformations])],
  controllers: [UserInformationsController],
  providers: [UserInformationsService],
})
export class UserInformationsModule {}
