import {MigrationInterface, QueryRunner} from "typeorm";

export class newTables1658871013569 implements MigrationInterface {
    name = 'newTables1658871013569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Favorite" ("userId" character varying NOT NULL, "_artists" character varying NOT NULL DEFAULT '', "_albums" character varying NOT NULL DEFAULT '', "_tracks" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_daff45566f01db17430e4d2a8dd" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Favorite"`);
    }

}
