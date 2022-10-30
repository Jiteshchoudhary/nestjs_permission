import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { RolePermissionService } from '../role_permission/role_permission.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private readonly userService: typeof User,
        private jwtService: JwtService,
        private rolePermissionService: RolePermissionService,

    ) { }

    async findOne(email: string) {
        return await this.userService.findOne({ where: { email } });
    }

    async generateToken(payload: any) {
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
    async findAllPermissionsOfUser(roleId: number) {
        return await this.rolePermissionService.getRolePermissions(roleId);
    }
}