import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common/base.service';
import { User } from '../entities/entities/Users';
import { UserCompany } from '../entities/entities/UserCompany';
import { UserInformations } from '../entities/entities/UserInformations';
import { UserOrderInformations } from '../entities/entities/UserOrderInformations';
import { Order } from '../entities/entities/Orders';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserCompany)
    private readonly userCompanyRepo: Repository<UserCompany>,
    @InjectRepository(UserInformations)
    private readonly userInformationsRepo: Repository<UserInformations>,
    @InjectRepository(UserOrderInformations)
    private readonly userOrderInformationsRepo: Repository<UserOrderInformations>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {
    super(userRepo);
  }

findOneById(id: number | string, relations: string[] = []) {
  return super.findOne(id, 'userId', relations);
}

  updateById(id: number | string, dto: Partial<User>) {
    return super.update(id, dto, 'userId');
  }

  async removeById(id: number | string) {
    const userId = String(id);
    const existingUser = await this.userRepo.findOne({ where: { userId } });

    if (!existingUser) {
      throw new NotFoundException(`Entity #${id} not found`);
    }

    const ordersCount = await this.orderRepo.count({ where: { userId } });
    if (ordersCount > 0) {
      throw new ConflictException(
        'Impossible de supprimer cet utilisateur car il est lié a des commandes.',
      );
    }

    await this.userRepo.manager.transaction(async (manager) => {
      await manager.delete(UserOrderInformations, { userId });
      await manager.delete(UserInformations, { userId });
      await manager.delete(UserCompany, { userId });
      await manager.delete(User, { userId });
    });
  }
}
