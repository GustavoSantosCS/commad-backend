import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey
} from 'typeorm';

export class createProductImageTable1625019640290
  implements MigrationInterface
{
  tableName = 'establishment_image';
  fatherTableName = 'products';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          { name: 'persistentName', type: 'varchar', isPrimary: true },
          { name: 'originalName', type: 'varchar' },
          { name: 'target', type: 'varchar' }
        ]
      }),
      true
    );

    await queryRunner.addColumn(
      this.fatherTableName,
      new TableColumn({ name: 'image', type: 'varchar' })
    );

    await queryRunner.createForeignKey(
      this.fatherTableName, // Tabela pai
      new TableForeignKey({
        columnNames: ['image'], // Coluna pai da Tabela pai
        referencedTableName: this.tableName, // Tabela referenciada
        referencedColumnNames: ['persistentName'], // Coluna referenciada
        name: 'product_image_fk', // Nome da ForeignKey
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.fatherTableName);
    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('image') !== -1
    );
    await queryRunner.dropForeignKey(this.fatherTableName, foreignKey);
    await queryRunner.dropColumn(this.fatherTableName, 'image');
    await queryRunner.dropTable(this.tableName);
  }
}