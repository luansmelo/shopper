import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from "sequelize-typescript";
import { CustomerModel } from "./customer";

@Table({ tableName: "ride", timestamps: true })
export class RideModel extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id!: string;

    @ForeignKey(() => CustomerModel)
    @Column({ type: DataType.UUID, allowNull: false })
    customer_id!: string;

    @BelongsTo(() => CustomerModel)
    customer!: CustomerModel;

    @Column({ type: DataType.DECIMAL, allowNull: false })
    origin_lat!: number;

    @Column({ type: DataType.DECIMAL, allowNull: false })
    origin_lon!: number;

    @Column({ type: DataType.DECIMAL, allowNull: false })
    destination_lat!: number;

    @Column({ type: DataType.DECIMAL, allowNull: false })
    destination_lon!: number;

    @Column({ type: DataType.DECIMAL, allowNull: false })
    distance!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    duration!: string;
}
