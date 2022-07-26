import { MigrationInterface, QueryRunner } from 'typeorm';

export class newTables1658704518295 implements MigrationInterface {
  name = 'newTables1658704518295';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "track" ALTER COLUMN "artistId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ALTER COLUMN "albumId" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "track" ALTER COLUMN "albumId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "track" ALTER COLUMN "artistId" SET NOT NULL`,
    );
  }
}
