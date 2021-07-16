import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(user) {
    const foundUser = await this.findOne(user.id);
    if (foundUser) return foundUser;

    const createdUser = this.create(user);
    return await this.save(createdUser);
  }
}
