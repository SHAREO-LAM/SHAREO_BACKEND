import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { UserCompany } from 'src/entities/entities/UserCompany';
import { Repository } from 'typeorm';

@Injectable()
export class UserCompanyService extends BaseService<UserCompany> {
  constructor(
    @InjectRepository(UserCompany)
    private readonly userCompanyRepo: Repository<UserCompany>,
  ) {
    super(userCompanyRepo);
  }

  findOneById(id: number | string) {
    return super.findOne(id, 'userCompanyId');
  }

  updateById(id: number | string, dto: Partial<UserCompany>) {
    return super.update(id, dto, 'userCompanyId');
  }

  removeById(id: number | string) {
    return super.remove(id, 'userCompanyId');
  }
}
