import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class CreateProductTable1625019009005 implements MigrationInterface {
  tableName = 'products';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'id', type: 'uuid', isPrimary: true },
          { name: 'description', type: 'text', isNullable: true },
          { name: 'isAvailable', type: 'boolean', default: true },
          { name: 'price', type: 'decimal', precision: 5, scale: 2 },
          { name: 'created_at', type: 'timestamp', default: 'now()' },
          { name: 'updated_at', type: 'timestamp', default: 'now()' },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
          { name: 'establishment_id', type: 'uuid' }
        ]
      })
    );

    await queryRunner.createForeignKey(
      this.tableName, // Tabela pai
      new TableForeignKey({
        columnNames: ['establishment_id'], // Coluna pai da Tabela pai
        referencedTableName: 'establishments', // Tabela referenciada
        referencedColumnNames: ['id'], // Coluna referenciada
        name: 'establishment_product_fk', // Nome da ForeignKey
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('establishment_id') !== -1
    );
    await queryRunner.dropForeignKey(this.tableName, foreignKey);
    await queryRunner.dropTable(this.tableName);
  }
}