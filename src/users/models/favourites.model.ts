import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Discount } from "../../discounts/models/discount.model";

interface IFavouritesCreationAttr {
  user_id: number;
  discount_id: number;
}

@Table({ tableName: "favourites" })
export class Favourites extends Model<Favourites, IFavouritesCreationAttr> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare user_id: number;

  @ForeignKey(() => Discount)
  @Column({
    type: DataType.INTEGER,
  })
  declare discount_id: number;
}
