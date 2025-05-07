import { Table, Column, Model, DataType } from "sequelize-typescript";

interface CategoryCreationAttrs {
  name: string;
  description: string;
  parent_id: number;
}

@Table({ tableName: "categories" })
export class Category extends Model<Category, CategoryCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare parent_id: number;
}
