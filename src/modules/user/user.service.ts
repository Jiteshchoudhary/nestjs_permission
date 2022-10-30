import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userRepository: typeof User) { }
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAndCountAll({});
  }

  async findOne(where = {}) {
    return await this.userRepository.findOne(where);
    // return `This action returns a #${id} user`;
  }

  async updateOne(userObj: User, params: any) {
    return await userObj.update(params);
  }
  async update(id: number, params: any) {
    return await this.userRepository.update(params, { where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
