import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from "sequelize-typescript"

@Table({ tableName: "customer", timestamps: true })
export class CustomerModel extends Model {
    @PrimaryKey
    @AutoIncrement 
    @Column({
        type: DataType.INTEGER,
    })
    id!: number

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email!: string
}
