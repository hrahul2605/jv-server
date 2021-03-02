const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class joinColumnPollsRivals1614687856498 {
    name = 'joinColumnPollsRivals1614687856498'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "rivals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "votes" integer NOT NULL DEFAULT '0', "pollsId" uuid, CONSTRAINT "PK_011f157cba2c2665e5f97cc3674" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "polls" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userID" text NOT NULL, "title" text NOT NULL, "description" text NOT NULL, CONSTRAINT "UQ_5c0e509b5921ff0b7c0c2359dfc" UNIQUE ("title"), CONSTRAINT "PK_b9bbb8fc7b142553c518ddffbb6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "googleID" text NOT NULL, "name" text NOT NULL, "picture" text NOT NULL, "email" text NOT NULL, CONSTRAINT "UQ_c28f2e9885cdacab90219693692" UNIQUE ("googleID"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "rivals" ADD CONSTRAINT "FK_38dd178b50efa516676a7cfcd26" FOREIGN KEY ("pollsId") REFERENCES "polls"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "rivals" DROP CONSTRAINT "FK_38dd178b50efa516676a7cfcd26"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "polls"`);
        await queryRunner.query(`DROP TABLE "rivals"`);
    }
}
