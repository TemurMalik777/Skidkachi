import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IStatusCreationAttrs {
  name: string;
  description: string;
}

@Table({ tableName: "status" })
export class Status extends Model<Status, IStatusCreationAttrs> {
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
}
