import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo, AutoIncrement } from "sequelize-typescript"
import { CustomerModel } from "./customer"
import { DriverModel } from "./driver"

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

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW }) // Adicionando o campo `date`
    date!: Date

    @Column({ type: DataType.STRING, allowNull: false })
    origin!: string

    @Column({ type: DataType.STRING, allowNull: false })
    destination!: string

    @ForeignKey(() => DriverModel)
    @Column({ type: DataType.INTEGER, allowNull: false })
    driver_id!: number

    @BelongsTo(() => DriverModel)
    driver!: DriverModel

    @Column({ type: DataType.DECIMAL, allowNull: false })
    distance!: number

    @Column({ type: DataType.STRING, allowNull: false })
    duration!: string

    @Column({ type: DataType.DECIMAL })
    value!: number
}
