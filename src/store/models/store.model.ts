import { Column, DataType, Model, Table } from "sequelize-typescript";

// IStoreCreateAttr interfeysi
interface IStoreCreateAttr {
  name: string;
  location: string;
  phone_number: string;
  owner_id: number;
  description: string;
  region_id: number;
  district_id: number;
  address: string;
  status_id: number;
  open_time: number;
  close_time: number;
  weekday: number;
}

@Table({ tableName: "stores" })
export class Store extends Model<Store, IStoreCreateAttr> {
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
    allowNull: false,
  })
  declare location: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone_number: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare owner_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare region_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare district_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare address: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare status_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare open_time: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare close_time: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare weekday: number;
}
