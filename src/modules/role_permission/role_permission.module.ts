import { Module } from '@nestjs/common';
import { RolePermissionService } from './role_permission.service';
import { RolePermissionController } from './role_permission.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolePermission } from './entities/role_permission.entity';
import { Role } from './entities/role.entity';

@Module({
  imports: [SequelizeModule.forFeature([RolePermission, Role])],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
  exports: [RolePermissionService],

})
export class RolePermissionModule { }
