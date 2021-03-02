import { EntityRepository, Repository } from 'typeorm';
import { PollsEntity } from '../enitites/polls.entity';
import { RivalsEntity } from '../enitites/rivals.entity';

@EntityRepository(RivalsEntity)
export class RivalsRepository extends Repository<RivalsEntity> {
  async savePollRivals(poll: PollsEntity, rivals) {
    const createdRival = this.create(rivals);
    createdRival.forEach((item) => (item.polls = poll));
    await this.save(createdRival);
  }
}
