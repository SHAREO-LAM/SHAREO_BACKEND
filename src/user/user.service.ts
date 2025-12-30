import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common/base.service';
import { User } from '../entities/entities/Users';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {
    super(userRepo);
  }

  findOneById(id: number | string) {
    return super.findOne(id, 'userId');
  }

  updateById(id: number | string, dto: Partial<User>) {
    return super.update(id, dto, 'userId');
  }

  removeById(id: number | string) {
    return super.remove(id, 'userId');
  }
}
