import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMultipleImages1700000000004 implements MigrationInterface {
  name = 'AddMultipleImages1700000000004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "domain" ADD COLUMN IF NOT EXISTS "image_urls" jsonb DEFAULT '[]'::jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "equipement_company" ADD COLUMN IF NOT EXISTS "image_urls" jsonb DEFAULT '[]'::jsonb`,
    );

    await queryRunner.query(
      `UPDATE "domain"
       SET "image_urls" = CASE
         WHEN "image_url" IS NULL OR "image_url" = '' THEN '[]'::jsonb
         ELSE jsonb_build_array("image_url")
       END
       WHERE "image_urls" IS NULL OR "image_urls" = '[]'::jsonb`,
    );

    await queryRunner.query(
      `UPDATE "equipement_company"
       SET "image_urls" = CASE
         WHEN "image_url" IS NULL OR "image_url" = '' THEN '[]'::jsonb
         ELSE jsonb_build_array("image_url")
       END
       WHERE "image_urls" IS NULL OR "image_urls" = '[]'::jsonb`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "equipement_company" DROP COLUMN IF EXISTS "image_urls"`,
    );
    await queryRunner.query(
      `ALTER TABLE "domain" DROP COLUMN IF EXISTS "image_urls"`,
    );
  }
}
