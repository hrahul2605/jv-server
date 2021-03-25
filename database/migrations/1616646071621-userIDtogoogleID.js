const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class userIDtogoogleID1616646071621 {
    name = 'userIDtogoogleID1616646071621'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "polls" RENAME COLUMN "userID" TO "googleID"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "polls" RENAME COLUMN "googleID" TO "userID"`);
    }
}
