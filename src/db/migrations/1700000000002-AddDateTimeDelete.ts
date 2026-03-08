import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDateTimeDelete1700000000002 implements MigrationInterface {
    name = 'AddDateTimeDelete1700000000002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // On crée la colonne en type timestamp pour inclure date + heure
        await queryRunner.query(
            `ALTER TABLE "equipement_company" ADD COLUMN "datetime_deleted" TIMESTAMP`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "equipement_company" DROP COLUMN "datetime_deleted"`
        );
    }
}