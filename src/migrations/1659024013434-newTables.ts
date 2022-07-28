import {MigrationInterface, QueryRunner} from "typeorm";

export class newTables1659024013434 implements MigrationInterface {
    name = 'newTables1659024013434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorites" ("userId" character varying NOT NULL, "_artists" character varying NOT NULL DEFAULT '', "_albums" character varying NOT NULL DEFAULT '', "_tracks" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_e747534006c6e3c2f09939da60f" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "favorites"`);
    }

}
