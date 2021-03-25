const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class pollsVoteCount1616680796510 {
    name = 'pollsVoteCount1616680796510'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "polls" ADD "voteCount" integer NOT NULL DEFAULT '0'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "polls" DROP COLUMN "voteCount"`);
    }
}
