import {MigrationInterface, QueryRunner} from "typeorm";

export class newTables1659020533820 implements MigrationInterface {
    name = 'newTables1659020533820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" ALTER COLUMN "_artists" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorites" ALTER COLUMN "_artists" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "favorites" ALTER COLUMN "_albums" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorites" ALTER COLUMN "_albums" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "favorites" ALTER COLUMN "_tracks" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorites" ALTER COLUMN "_tracks" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" ALTER COLUMN "_tracks" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "favorites" ALTER COLUMN "_tracks" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorites" ALTER COLUMN "_albums" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "favorites" ALTER COLUMN "_albums" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorites" ALTER COLUMN "_artists" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "favorites" ALTER COLUMN "_artists" DROP NOT NULL`);
    }

}
