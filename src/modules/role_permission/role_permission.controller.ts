import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CheckPermissions } from '../../decorators/check-permissions.decorator';
import { RolePermissionService } from './role_permission.service';
import { PermissionAction } from '../../constants/permission-action';
import { ObjectName } from '../../constants/object-name';
import { RoleDto } from './dto/role.dto';
import { PermissionDto } from './dto/permission.dto';
import { RolePermission as PermissionEntity } from './entities/role_permission.entity';
import { Public } from 'src/decorators/public.decorator';

@Controller('role-permission')
@ApiTags('role-permission')
export class RolePermissionController {
  constructor(private rolePermission: RolePermissionService) { }

  @Public()
  @Get()
  @CheckPermissions([PermissionAction.Read, ObjectName.role])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get Roles',
  })
  async getRoles() {
    return await this.rolePermission.getRoles();
  }

  @Get(':id')
  @CheckPermissions([PermissionAction.Read, ObjectName.role])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get permissions of a Role',
  })
  async getRolePermissions(@Param('id') id: number) {
    return await this.rolePermission.getRolePermissions(id);
  }

  @Public()
  @Post()
  // @CheckPermissions([PermissionAction.Create, ObjectName.role])
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a role',
  })
  async createRole(@Body() roleDto: RoleDto) {
    return await this.rolePermission.createRole(roleDto);
  }

  @Public()
  @Post(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: PermissionEntity,
    status: HttpStatus.CREATED,
    description: "Create role's permissions",
  })
  async createRolePermissions(
    @Param('id') id: number,
    @Body() permissionDto: PermissionDto,
  ) {
    const role = await this.rolePermission.getRole(id);
    if (role) {
      permissionDto['roleId'] = role.id;
      return await this.rolePermission.createRolePermissions(
        permissionDto,
        // role.id,
      );
    }

    throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
  }
}
