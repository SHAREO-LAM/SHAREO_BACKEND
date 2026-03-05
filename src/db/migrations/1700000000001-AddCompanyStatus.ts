import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompanyStatus1700000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add status column to company table with default value and constraint
    await queryRunner.query(`
      ALTER TABLE company 
      ADD COLUMN status VARCHAR(255) NOT NULL DEFAULT 'PENDING_VALIDATION'
      CHECK (status IN ('PENDING_VALIDATION', 'VALIDATED'))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop status column
    await queryRunner.query(`
      ALTER TABLE company DROP COLUMN IF EXISTS status
    `);
  }
}
