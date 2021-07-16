const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class manyToManyPollsUsers1626423436522 {
    name = 'manyToManyPollsUsers1626423436522'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "polls_voted_users_users" ("pollsId" uuid NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_61c603cb4f1841a3bc2a698ebe8" PRIMARY KEY ("pollsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ca25b707ea15c6df223329edab" ON "polls_voted_users_users" ("pollsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_84586f01e7739d0f2d4b61c358" ON "polls_voted_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "polls" DROP COLUMN "votedUsers"`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" ADD CONSTRAINT "FK_ca25b707ea15c6df223329edabe" FOREIGN KEY ("pollsId") REFERENCES "polls"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" ADD CONSTRAINT "FK_84586f01e7739d0f2d4b61c3586" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" DROP CONSTRAINT "FK_84586f01e7739d0f2d4b61c3586"`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" DROP CONSTRAINT "FK_ca25b707ea15c6df223329edabe"`);
        await queryRunner.query(`ALTER TABLE "polls" ADD "votedUsers" jsonb NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`DROP INDEX "IDX_84586f01e7739d0f2d4b61c358"`);
        await queryRunner.query(`DROP INDEX "IDX_ca25b707ea15c6df223329edab"`);
        await queryRunner.query(`DROP TABLE "polls_voted_users_users"`);
    }
}
