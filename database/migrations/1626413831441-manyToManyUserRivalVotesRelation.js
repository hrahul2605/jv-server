const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class manyToManyUserRivalVotesRelation1626413831441 {
    name = 'manyToManyUserRivalVotesRelation1626413831441'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "rivals_users_users" ("rivalsId" uuid NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_bfb344aaa475733be04842a4d7f" PRIMARY KEY ("rivalsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35c085bb11495d6bf144cae87e" ON "rivals_users_users" ("rivalsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9fca691b6ced805c43b19adb5e" ON "rivals_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "rivals" DROP COLUMN "users"`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" ADD CONSTRAINT "FK_35c085bb11495d6bf144cae87ed" FOREIGN KEY ("rivalsId") REFERENCES "rivals"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" ADD CONSTRAINT "FK_9fca691b6ced805c43b19adb5ef" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "rivals_users_users" DROP CONSTRAINT "FK_9fca691b6ced805c43b19adb5ef"`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" DROP CONSTRAINT "FK_35c085bb11495d6bf144cae87ed"`);
        await queryRunner.query(`ALTER TABLE "rivals" ADD "users" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`DROP INDEX "IDX_9fca691b6ced805c43b19adb5e"`);
        await queryRunner.query(`DROP INDEX "IDX_35c085bb11495d6bf144cae87e"`);
        await queryRunner.query(`DROP TABLE "rivals_users_users"`);
    }
}
