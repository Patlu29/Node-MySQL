import { MigrationInterface, QueryRunner } from "typeorm";

export class Table011742544658525 implements MigrationInterface {
    name = 'Table011742544658525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`flight\` (\`id\` int NOT NULL AUTO_INCREMENT, \`F_number\` int NOT NULL, \`F_name\` varchar(255) NOT NULL, \`Destination\` varchar(255) NOT NULL, \`IsActive\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_2711669eba6a4f58af168da5a0\` (\`F_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_2711669eba6a4f58af168da5a0\` ON \`flight\``);
        await queryRunner.query(`DROP TABLE \`flight\``);
    }

}
