import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Favourites } from "./favourites.model";
import { Discount } from "../../discounts/models/discount.model";
import { Store } from "../../store/models/store.model";
import { StoreSubscribes } from "./store_subscribes.model";

interface IUsersCreateAttr {
  name: string;
  phone: string;
  email: string;
  hashed_password: string;
  location: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUsersCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING(15),
    unique: true,
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING(50),
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
    allowNull: true,
  })
  declare hashed_refresh_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_owner: boolean;

  @Column({
    type: DataType.STRING,
  })
  declare location: string;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4(),
  })
  declare activation_link: string;

  @BelongsToMany(() => Discount, () => Favourites)
  discount: Discount[];

  @BelongsToMany(()=>Store, ()=>StoreSubscribes )
  store: Store[]
}
