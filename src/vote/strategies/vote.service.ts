import { Injectable } from '@nestjs/common';
import { PollsRepository } from 'src/polls/repositories/polls.repository';
import { RivalsRepository } from 'src/polls/repositories/rivals.repository';

@Injectable()
export class VoteService {
  constructor(
    private readonly rivalsRepository: RivalsRepository,
    private readonly pollsRepository: PollsRepository,
  ) {}

  async addVote(id: string, googleID: string, pollId: string) {
    try {
      const poll = await this.pollsRepository.findOne(pollId);

      if (!poll.votedUsers.includes(googleID)) {
        await this.pollsRepository.save({
          ...poll,
          votedUsers: poll.votedUsers.concat(googleID),
        });

        const rivalToBeVoted = await this.rivalsRepository.findOne(id);
        const updatedRival = this.rivalsRepository.create({
          ...rivalToBeVoted,
          votes: rivalToBeVoted.votes + 1,
          users: rivalToBeVoted.users.concat(googleID),
        });

        const final = await this.rivalsRepository.save(updatedRival);

        return {
          id: final.id,
          title: final.title,
          votes: final.votes,
          googleID,
          success: true,
        };
      }
      return { googleID, success: false };
    } catch (e) {
      return { googleID, success: false };
    }
  }
}
