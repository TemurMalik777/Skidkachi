import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Store } from "../../store/models/store.model";

interface IStoreSubscribesCreationAttr {
  user_id: number;
  store_id: number;
}

@Table({ tableName: "favourites" })
export class StoreSubscribes extends Model<
  StoreSubscribes,
  IStoreSubscribesCreationAttr
> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  declare user_id: number;

  @ForeignKey(() => Store)
  @Column({
    type: DataType.INTEGER,
  })
  declare store_id: number;
}
