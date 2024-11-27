import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo, AutoIncrement } from "sequelize-typescript"
import { CustomerModel } from "./customer"

@Table({ tableName: "ride", timestamps: true })
export class RideModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number

    @ForeignKey(() => CustomerModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    customer_id!: number

    @BelongsTo(() => CustomerModel)
    customer!: CustomerModel

    @Column({ type: DataType.DECIMAL, allowNull: false })
    origin_lat!: number

    @Column({ type: DataType.DECIMAL, allowNull: false })
    origin_lon!: number

    @Column({ type: DataType.DECIMAL, allowNull: false })
    destination_lat!: number

    @Column({ type: DataType.DECIMAL, allowNull: false })
    destination_lon!: number

    @Column({ type: DataType.DECIMAL, allowNull: false })
    distance!: number

    @Column({ type: DataType.STRING, allowNull: false })
    duration!: string
}
