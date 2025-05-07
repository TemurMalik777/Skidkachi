import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAddressCreation {
  user_id: number;
  last_state: string
}

@Table({ tableName: "Address" })
export class Address extends Model<Address, IAddressCreation> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare address: string;

  @Column({
    type: DataType.BIGINT,
  })
  declare user_id: number;

  @Column({
    type: DataType.STRING,
  })
  declare location: string;

  @Column({
    type: DataType.STRING,
  })
  declare last_state: string;
}
