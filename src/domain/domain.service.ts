import { Injectable } from '@nestjs/common';
import { Domain } from 'src/entities/entities/Domain';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class DomainService extends BaseService<Domain> {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepo: Repository<Domain>,
  ) {
    super(domainRepo);
  }

  // Méthodes DB-first pour gérer la PK domainId
  findOneById(id: number | string) {
    return super.findOne(id, 'domainId');
  }

  updateById(id: number | string, dto: Partial<Domain>) {
    return super.update(id, dto, 'domainId');
  }

  removeById(id: number | string) {
    return super.remove(id, 'domainId');
  }
}
