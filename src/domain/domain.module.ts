import { Module } from '@nestjs/common';
import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';
import { Domain } from 'src/entities/entities/Domain';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Domain])],
  controllers: [DomainController],
  providers: [DomainService],
})
export class DomainModule {}
