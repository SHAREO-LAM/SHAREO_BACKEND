import { Injectable } from '@nestjs/common';
import { CompanyPayout } from 'src/entities/entities/CompanyPayout';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyPayoutService extends BaseService<CompanyPayout> {
  constructor(
    @InjectRepository(CompanyPayout)
    private readonly companyPayoutRepo: Repository<CompanyPayout>,
  ) {
    super(companyPayoutRepo);
  }

  // Méthodes DB-first pour gérer la PK companyPayoutId
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
