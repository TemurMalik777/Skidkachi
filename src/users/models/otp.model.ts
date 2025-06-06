import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IOtpCreationATtr {
  id: string;
  phone_number: string;
  otp: string;
  expiration_time: Date;
}

@Table({ tableName: "Otp" })
export class Otp extends Model<Otp, IOtpCreationATtr> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare phone_number: string;

  @Column({
    type: DataType.STRING,
  })
  declare otp: string;

  @Column({
    type: DataType.DATE,
  })
  declare expiration_time: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare verified: boolean;
}
