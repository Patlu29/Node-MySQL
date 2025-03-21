import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedCreatedDate1742547239287 implements MigrationInterface {
    name = 'AddedCreatedDate1742547239287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`flight\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`flight\` DROP COLUMN \`createdAt\``);
    }

}
