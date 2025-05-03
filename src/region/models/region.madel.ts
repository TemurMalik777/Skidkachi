import { Column, DataType, Model, Table } from "sequelize-typescript";


interface IRegionCreaterAttr{
    name: string
}


@Table({tableName: "region"})
export class Region extends Model<Region, IRegionCreaterAttr> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    declare name: string
}
