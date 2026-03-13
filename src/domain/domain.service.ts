import { Injectable } from '@nestjs/common';
import { Domain } from 'src/entities/entities/Domain';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { Repository } from 'typeorm';
import { OrderItem } from 'src/entities/entities/OrderItem';

@Injectable()
export class DomainService extends BaseService<Domain> {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepo: Repository<Domain>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
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

  async removeById(id: number | string) {
    const domainId = String(id);
    await this.findOneById(id);

    await this.domainRepo.manager.transaction(async (manager) => {
      await manager.update(OrderItem, { domainId }, { domainId: null as any });
      await manager.delete(Domain, { domainId });
    });
  }
}
