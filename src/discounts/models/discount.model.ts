import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";

interface DiscountCreationAttrs {
  store_id: number;
  title: string;
  description: string;
  discount_percent: number;
  start_date: Date;
  end_date: Date;
  category_id: number;
  discount_value: number;
  special_link: string;
  is_active: boolean;
  type_id: number;
}

@Table({ tableName: "discounts" })
export class Discount extends Model<Discount, DiscountCreationAttrs> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  declare store_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;

  @Column({ type: DataType.DECIMAL(5, 2), allowNull: true })
  declare discount_percent: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare start_date: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  declare end_date: Date;

  @Column({ type: DataType.BIGINT, allowNull: true })
  declare category_id: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  declare discount_value: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare special_link: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;

  @Column({ type: DataType.BIGINT, allowNull: true })
  declare type_id: number;
}
