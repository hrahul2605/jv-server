import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PollsBodyDto } from '../dto/polls.dto';
import { PollsRepository } from '../repositories/polls.repository';
import { RivalsRepository } from '../repositories/rivals.repository';

@Injectable()
export class PollsService {
  constructor(
    private readonly pollsRepository: PollsRepository,
    private readonly rivalsRepository: RivalsRepository,
  ) {}

  async getPoll(id: string) {
    try {
      const poll = await this.pollsRepository.getPollById(id);
      return poll;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async createPoll(data: PollsBodyDto) {
    try {
      const { rivals, ...pollData } = data;

      const savedPollData = await this.pollsRepository.createAndSavePoll(
        pollData,
      );
      await this.rivalsRepository.savePollRivals(savedPollData, rivals);

      return { id: savedPollData.id };
    } catch (e) {
      if (e.code === '23505')
        throw new BadRequestException({
          success: false,
          message: 'Poll already exists with same title.',
        });
      else throw new InternalServerErrorException(e);
    }
  }

  async deletePoll(id: string) {
    try {
      const data = await this.pollsRepository.delete(id);
      return data.affected ? true : false;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
