import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IMediaCreationAttr {
  name: string;
  file: string;
  table_name: string;
  table_id: number;
}

@Table({ tableName: "Media" })
export class Media extends Model<Media, IMediaCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  file: string;

  @Column({
    type: DataType.STRING,
  })
  table_name: string;

  @Column({
    type: DataType.INTEGER,
  })
  table_id: number; // To'g'irlangan
}
