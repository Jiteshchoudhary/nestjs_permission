import { Ability } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AppAbility, PermissionObjectType } from '../../../types';
import { PermissionAction } from '../../../constants/permission-action';
import { RolePermission as PermissionEntity } from 'src/modules/role_permission/entities/role_permission.entity';
import { AuthService } from '../auth.service';

interface CaslPermission {
  action: PermissionAction;
  subject: string;
}

@Injectable()
export class CaslAbilityFactory {
  constructor(private authService: AuthService) { }

  async createForUser(userObject: any): Promise<AppAbility> {
    const dbPermissions: PermissionEntity[] =
      await this.authService.findAllPermissionsOfUser(userObject.roleId);
    const caslPermissions: CaslPermission[] = dbPermissions.map(
      (permission) => ({
        action: permission.action,
        subject: permission.object,
      }),
    );
    // console.log('casl permissions', caslPermissions);
    return new Ability<[PermissionAction, PermissionObjectType]>(
      caslPermissions,
    );
  }
}
