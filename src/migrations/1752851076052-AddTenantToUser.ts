import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTenantToUser1752851076052 implements MigrationInterface {
    name = "AddTenantToUser1752851076052";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "tenant" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "address" character varying(255) NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_da8c6efd67bb301e810e56ac139" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "refreshTokens" ("id" SERIAL NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_c4a0078b846c2c4508473680625" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`ALTER TABLE "user" ADD "tenant_id" integer`);
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "FK_ae07d48a61ca20ab3586d397a71" FOREIGN KEY ("tenant_id") REFERENCES "tenant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "refreshTokens" ADD CONSTRAINT "FK_265bec4e500714d5269580a0219" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "refreshTokens" DROP CONSTRAINT "FK_265bec4e500714d5269580a0219"`,
        );
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "FK_ae07d48a61ca20ab3586d397a71"`,
        );
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "tenant_id"`);
        await queryRunner.query(`DROP TABLE "refreshTokens"`);
        await queryRunner.query(`DROP TABLE "tenant"`);
    }
}
