const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addedVotedUsers1616665611166 {
    name = 'addedVotedUsers1616665611166'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "polls" ADD "votedUsers" jsonb NOT NULL DEFAULT '[]'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "polls" DROP COLUMN "votedUsers"`);
    }
}
