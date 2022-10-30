import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolePermissionModule } from './modules/role_permission/role_permission.module';
import { Role } from './modules/role_permission/entities/role.entity';
import { RolePermission } from './modules/role_permission/entities/role_permission.entity';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './modules/auth/permissions.guard';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'rolePermission',
      models: [Role, RolePermission, User],
      autoLoadModels: true,
      synchronize: true
    }),
    UserModule,
    AuthModule,
    RolePermissionModule,
  ],
  controllers: [AppController],
  // providers: [AppService],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard
    }
  ]
})
export class AppModule { }
