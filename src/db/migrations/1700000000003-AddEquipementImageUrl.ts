import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEquipementImageUrl1700000000003
  implements MigrationInterface
{
  name = 'AddEquipementImageUrl1700000000003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "equipement_company" ADD COLUMN IF NOT EXISTS "image_url" VARCHAR(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "equipement_company" DROP COLUMN IF EXISTS "image_url"`,
    );
  }
}
