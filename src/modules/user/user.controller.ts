import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { comparePassword, passwordEncyrption } from 'src/helpers/passwordEncyrption/bcrypt';
import { CheckPermissions } from 'src/decorators/check-permissions.decorator';
import { PermissionAction } from 'src/constants/permission-action';
import { ObjectName } from 'src/constants/object-name';
import { IS_PUBLIC_KEY, Public } from 'src/decorators/public.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly authService: AuthService) { }

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // createUserDto['role'] = 'user';
    createUserDto['password'] = await passwordEncyrption(createUserDto.password);
    let payload = await this.userService.create(createUserDto);
    let data = { roleId: createUserDto.roleId, firstName: payload.firstName, lastName: payload.lastName, email: payload.email, id: payload.id, role: payload.role }
    return this.authService.generateToken(data);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    let user = await this.userService.findOne({ email: loginDto.email });
    if (!user) {
      throw new BadRequestException()
    }
    let isPasswordValid = await comparePassword(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException();
    }
    let data = { firstName: user.firstName, lastName: user.lastName, email: user.email, id: user.id, roleId: user.roleId }
    return await this.authService.generateToken(data);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/add-members')
  async addMembers(@Body() createUserDto: CreateUserDto) {
    // createUserDto['role'] = 'photographer';
    createUserDto['password'] = await passwordEncyrption(createUserDto.password);
    return await this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @CheckPermissions([PermissionAction.Create, ObjectName.user])
  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
