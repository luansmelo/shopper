import { Table, Column, Model, DataType, PrimaryKey } from "sequelize-typescript";

@Table({ tableName: "customer", timestamps: true })
export class CustomerModel extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    email!: string;
}
