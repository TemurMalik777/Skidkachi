import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreateAttr {
  full_name: string;
  email: string;
  hashed_password: string;
  is_creator: string;
}

@Table({ tableName: "Admin" })
export class Admin extends Model<Admin, IAdminCreateAttr> {
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
  declare full_name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  declare hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  declare is_creator: string;
}
