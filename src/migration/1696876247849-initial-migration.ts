import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1696876247849 implements MigrationInterface {
    name = 'InitialMigration1696876247849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_98c490c2a0caed0d337067dc5ad"`);
        await queryRunner.query(`ALTER TABLE "order_item" RENAME COLUMN "burritoId" TO "burrito_fk"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_63e2cab42218e12be4ec160adf7" FOREIGN KEY ("burrito_fk") REFERENCES "burrito"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_63e2cab42218e12be4ec160adf7"`);
        await queryRunner.query(`ALTER TABLE "order_item" RENAME COLUMN "burrito_fk" TO "burritoId"`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_98c490c2a0caed0d337067dc5ad" FOREIGN KEY ("burritoId") REFERENCES "burrito"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
