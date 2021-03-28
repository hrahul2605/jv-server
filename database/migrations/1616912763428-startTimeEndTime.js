const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class startTimeEndTime1616912763428 {
    name = 'startTimeEndTime1616912763428'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "polls" ADD "startTime" TIMESTAMP WITH TIME ZONE NOT NULL`);
        await queryRunner.query(`ALTER TABLE "polls" ADD "endTime" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "polls" DROP COLUMN "endTime"`);
        await queryRunner.query(`ALTER TABLE "polls" DROP COLUMN "startTime"`);
    }
}
