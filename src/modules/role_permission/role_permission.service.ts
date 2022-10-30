
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PermissionDto } from './dto/permission.dto';
import { RoleDto } from './dto/role.dto';
import { Role } from './entities/role.entity';
import { RolePermission } from './entities/role_permission.entity';



@Injectable()
export class RolePermissionService {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
    @InjectModel(RolePermission) private readonly permissionRepository: typeof RolePermission

  ) { }

  async getRoles() {
    return await this.roleRepository.findAndCountAll({});
  }

  async getRole(roleId: number) {
    return await this.roleRepository.findOne({ where: { id: roleId } });
  }

  async createRole(roleDto: RoleDto) {
    try {
      return await this.roleRepository.create(roleDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_ACCEPTABLE,
          error: 'Unique key violation ' + error,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  async getRolePermissions(roleId: number) {
    return await this.permissionRepository.findAll({ where: { roleId } });
  }

  async createRolePermissions(
    params: any
    // permissionsDto: PermissionDto,
    // roleId,
  ) {
    // let data = { ...permissionsDto, roleId: roleId }
    return await this.permissionRepository.create(params);
    // permissionsDto.map(async (permission) => {
    //   const permissionEntity = this.permissionRepository.create({
    //     ...permission,
    //     role: roleId,
    //   });

    //   (await this.permissionExist(await permissionEntity))
    //     ? ''
    //     : this.permissionRepository.create(permissionEntity);
    // });
    // return permissionsDto;
  }

  async permissionExist(permissionEntity: RolePermission): Promise<boolean> {
    const permission = await this.permissionRepository.findAll({
      where: {
        role: permissionEntity.role,
        action: permissionEntity.action,
        object: permissionEntity.object,
      },
    });

    return permission.length > 0 ? true : false;
  }
}
