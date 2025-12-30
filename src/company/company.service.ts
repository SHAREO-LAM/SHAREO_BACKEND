import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { Company } from 'src/entities/entities/Company';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyService extends BaseService<Company> {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {
    super(companyRepo);
  }

  // Méthodes DB-first pour gérer la PK companyId
  findOneById(id: number | string) {
    return super.findOne(id, 'companyId');
  }

  updateById(id: number | string, dto: Partial<Company>) {
    return super.update(id, dto, 'companyId');
  }

  removeById(id: number | string) {
    return super.remove(id, 'companyId');
  }
}
