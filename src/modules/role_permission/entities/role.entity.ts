import { Table, DataType, Model, Column } from 'sequelize-typescript';

@Table({ tableName: "roles" })
export class Role extends Model<Role> {
    @Column({
        type: DataType.STRING
    })
    name: string
}
