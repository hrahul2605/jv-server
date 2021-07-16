const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class userEntityPrimaryColumn1626426284247 {
    name = 'userEntityPrimaryColumn1626426284247'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "polls" RENAME COLUMN "googleID" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_c28f2e9885cdacab90219693692"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "googleID"`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" DROP CONSTRAINT "FK_9fca691b6ced805c43b19adb5ef"`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" DROP CONSTRAINT "FK_84586f01e7739d0f2d4b61c3586"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" DROP CONSTRAINT "PK_bfb344aaa475733be04842a4d7f"`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" ADD CONSTRAINT "PK_35c085bb11495d6bf144cae87ed" PRIMARY KEY ("rivalsId")`);
        await queryRunner.query(`DROP INDEX "IDX_9fca691b6ced805c43b19adb5e"`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" ADD "usersId" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" DROP CONSTRAINT "PK_35c085bb11495d6bf144cae87ed"`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" ADD CONSTRAINT "PK_bfb344aaa475733be04842a4d7f" PRIMARY KEY ("rivalsId", "usersId")`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" DROP CONSTRAINT "PK_61c603cb4f1841a3bc2a698ebe8"`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" ADD CONSTRAINT "PK_ca25b707ea15c6df223329edabe" PRIMARY KEY ("pollsId")`);
        await queryRunner.query(`DROP INDEX "IDX_84586f01e7739d0f2d4b61c358"`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" ADD "usersId" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" DROP CONSTRAINT "PK_ca25b707ea15c6df223329edabe"`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" ADD CONSTRAINT "PK_61c603cb4f1841a3bc2a698ebe8" PRIMARY KEY ("pollsId", "usersId")`);
        await queryRunner.query(`CREATE INDEX "IDX_9fca691b6ced805c43b19adb5e" ON "rivals_users_users" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_84586f01e7739d0f2d4b61c358" ON "polls_voted_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" ADD CONSTRAINT "FK_9fca691b6ced805c43b19adb5ef" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" ADD CONSTRAINT "FK_84586f01e7739d0f2d4b61c3586" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" DROP CONSTRAINT "FK_84586f01e7739d0f2d4b61c3586"`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" DROP CONSTRAINT "FK_9fca691b6ced805c43b19adb5ef"`);
        await queryRunner.query(`DROP INDEX "IDX_84586f01e7739d0f2d4b61c358"`);
        await queryRunner.query(`DROP INDEX "IDX_9fca691b6ced805c43b19adb5e"`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" DROP CONSTRAINT "PK_61c603cb4f1841a3bc2a698ebe8"`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" ADD CONSTRAINT "PK_ca25b707ea15c6df223329edabe" PRIMARY KEY ("pollsId")`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" ADD "usersId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_84586f01e7739d0f2d4b61c358" ON "polls_voted_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" DROP CONSTRAINT "PK_ca25b707ea15c6df223329edabe"`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" ADD CONSTRAINT "PK_61c603cb4f1841a3bc2a698ebe8" PRIMARY KEY ("pollsId", "usersId")`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" DROP CONSTRAINT "PK_bfb344aaa475733be04842a4d7f"`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" ADD CONSTRAINT "PK_35c085bb11495d6bf144cae87ed" PRIMARY KEY ("rivalsId")`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" DROP COLUMN "usersId"`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" ADD "usersId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_9fca691b6ced805c43b19adb5e" ON "rivals_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" DROP CONSTRAINT "PK_35c085bb11495d6bf144cae87ed"`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" ADD CONSTRAINT "PK_bfb344aaa475733be04842a4d7f" PRIMARY KEY ("rivalsId", "usersId")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "polls_voted_users_users" ADD CONSTRAINT "FK_84586f01e7739d0f2d4b61c3586" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rivals_users_users" ADD CONSTRAINT "FK_9fca691b6ced805c43b19adb5ef" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD "googleID" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_c28f2e9885cdacab90219693692" UNIQUE ("googleID")`);
        await queryRunner.query(`ALTER TABLE "polls" RENAME COLUMN "userId" TO "googleID"`);
    }
}
