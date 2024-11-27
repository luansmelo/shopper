import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript"

@Table({ tableName: "driver", timestamps: true })
export class DriverModel extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER, 
    })
    id!: number

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string

    @Column({ type: DataType.TEXT, allowNull: false })
    description!: string

    @Column({ type: DataType.STRING, allowNull: false })
    car!: string

    @Column({ type: DataType.STRING, allowNull: false })
    rating!: string

    @Column({ type: DataType.TEXT, allowNull: false })
    comment!: string

    @Column({ type: DataType.DECIMAL, allowNull: false })
    rate_per_km!: number

    @Column({ type: DataType.INTEGER, allowNull: false })
    min_km!: number
}
