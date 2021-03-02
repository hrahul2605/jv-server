import { EntityRepository, Repository } from 'typeorm';
import { PollsDto } from '../dto/polls.dto';
import { PollsEntity } from '../enitites/polls.entity';

@EntityRepository(PollsEntity)
export class PollsRepository extends Repository<PollsEntity> {
  async getPollById(id: string) {
    try {
      const poll = await this.findOne(id, { relations: ['rivals'] });
      return poll;
    } catch (e) {
      console.log(e);
    }
  }

  async createAndSavePoll(data: PollsDto): Promise<PollsEntity> {
    const createdPoll = new PollsEntity(data);
    const savedPoll = await this.save(createdPoll);
    return savedPoll;
  }
}
