import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProducts1624747881677 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Product",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "productname",
                        type: "varchar"
                    },
                    {
                        name:"price",
                        type: "double"
                    },
                    {
                        name: "type",
                        type: "varchar"
                    },
                    {
                        name:"categoty_id",
                        type: "int"
                    },
                    {
                        name: "estado",
                        type: "varchar",
                        length: "2"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products");
    }

}
