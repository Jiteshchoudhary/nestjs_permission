import { Table, Model, DataType, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Role } from 'src/modules/role_permission/entities/role.entity';
@Table({ tableName: 'user', paranoid: true })
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    firstName: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    lastName: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    profilePic: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    countryCode: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    phoneNumber: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    emailVerificationToken: string

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    isEmailVerified: boolean

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    resetPasswordToken: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    deviceToken: string


    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    roleId: number;

    @BelongsTo(() => Role)
    role: Role;
}
