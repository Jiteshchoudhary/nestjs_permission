import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { RolePermissionModule } from '../role_permission/role_permission.module';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { PermissionsGuard } from './permissions.guard';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    RolePermissionModule,
    PassportModule,
    JwtModule.register({
      secret: 'jitesh',
      signOptions: { expiresIn: '6000s' },
    }),
  ],
  // providers: [AuthService, JwtStrategy],
  providers: [AuthService, JwtStrategy, CaslAbilityFactory, PermissionsGuard],

  // exports: [AuthService],
  exports: [JwtModule, AuthService, CaslAbilityFactory, PermissionsGuard],

})
export class AuthModule { }