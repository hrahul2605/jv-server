import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOne(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne(id);
  }

  async createUser(user): Promise<UserEntity> {
    const savedUser = await this.userRepository.createUser(user);
    return savedUser[0];
  }
}
