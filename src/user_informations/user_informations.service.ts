import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/common/base.service';
import { UserInformations } from 'src/entities/entities/UserInformations';

@Injectable()
export class UserInformationsService extends BaseService<UserInformations> {
  private readonly primaryKey: keyof UserInformations = 'userInformationsId';

  constructor(
    @InjectRepository(UserInformations)
    private readonly userInformationsRepo: Repository<UserInformations>,
  ) {
    super(userInformationsRepo);
  }

  // Override pour ne plus avoir à passer pk partout
  async findOne(id: number | string) {
    return super.findOne(id, this.primaryKey);
  }

  async update(id: number | string, dto: any) {
    return super.update(id, dto, this.primaryKey);
  }

  async remove(id: number | string) {
    return super.remove(id, this.primaryKey);
  }
}
