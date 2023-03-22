import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLocation1679509875916 implements MigrationInterface {
  private table = new Table({
    name: 'locations',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '130',
      },
      {
        name: 'cep',
        type: 'varchar',
        isUnique: true,
        length: '8',
        isNullable: true,
      },
      {
        name: 'street_name',
        type: 'varchar',
        length: '130',
      },
      {
        name: 'address_number',
        type: 'varchar',
      },
      {
        name: 'neighborhood',
        type: 'varchar',
      },
      {
        name: 'city',
        type: 'varchar',
      },
      {
        name: 'state',
        type: 'varchar',
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        isNullable: true,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }
}
