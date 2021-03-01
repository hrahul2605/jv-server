import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findByGoogleId(googleID: string) {
    return await this.findOne({ googleID });
  }

  async createUser(user) {
    const foundUser = await this.findByGoogleId(user.googleID);
    if (foundUser) return foundUser;

    const createdUser = this.create(user);
    return await this.save(createdUser);
  }
}
