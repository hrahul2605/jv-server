const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class columnUsers1616681694611 {
    name = 'columnUsers1616681694611'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "rivals" ADD "users" jsonb NOT NULL DEFAULT '[]'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "rivals" DROP COLUMN "users"`);
    }
}
