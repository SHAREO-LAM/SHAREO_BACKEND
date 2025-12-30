// src/common/base.service.ts
import { Repository, ObjectLiteral, DeepPartial } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BaseService<T extends ObjectLiteral> {
  constructor(protected readonly repo: Repository<T>) {}

  async create(dto: DeepPartial<T>): Promise<T> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repo.find();
  }

  /**
   * findOne by primary key
   * @param id The value of the primary key
   * @param pk The name of the primary key property in the entity
   */
  async findOne(id: number | string, pk: keyof T): Promise<T> {
    const entity = await this.repo.findOneBy({ [pk]: id } as any);
    if (!entity) throw new NotFoundException(`Entity #${id} not found`);
    return entity;
  }

  /**
   * Update entity by primary key
   * @param id The value of the primary key
   * @param dto Partial entity
   * @param pk The name of the primary key property in the entity
   */
  async update(
    id: number | string,
    dto: QueryDeepPartialEntity<T>,
    pk: keyof T,
  ): Promise<T> {
    await this.repo.update({ [pk]: id } as any, dto);
    return this.findOne(id, pk);
  }

  /**
   * Remove entity by primary key
   * @param id The value of the primary key
   * @param pk The name of the primary key property in the entity
   */
  async remove(id: number | string, pk: keyof T): Promise<void> {
    const entity = await this.findOne(id, pk);
    await this.repo.remove(entity);
  }
}
