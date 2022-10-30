import { Table, DataType, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ObjectName } from 'src/constants/object-name';
import { PermissionAction } from 'src/constants/permission-action';
import { Role } from './role.entity';

@Table({ tableName: "rolepermission" })
export class RolePermission extends Model<RolePermission> {
    @Column({
        type: DataType.ENUM(...Object.values(PermissionAction))

    })
    action: PermissionAction

    @Column({
        type: DataType.ENUM(...Object.values(ObjectName))

    })
    object: ObjectName

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    roleId: number;

    @BelongsTo(() => Role)
    role: Role;
}
