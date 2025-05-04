import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from "sequelize-typescript";

interface StoreSocialLinkCreationAttrs {
  url: string;
  description: string;
  store_id: number;
  social_media_type_id: number;
}

@Table({ tableName: "store_social_links" })
export class StoreSocialLink extends Model<
  StoreSocialLink,
  StoreSocialLinkCreationAttrs
> {
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
  declare url: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare store_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare social_media_type_id: number;
}
