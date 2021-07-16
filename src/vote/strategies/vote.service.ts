import { Injectable } from '@nestjs/common';
import { PollsRepository } from 'src/polls/repositories/polls.repository';
import { RivalsRepository } from 'src/polls/repositories/rivals.repository';
import { UserRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class VoteService {
  constructor(
    private readonly rivalsRepository: RivalsRepository,
    private readonly pollsRepository: PollsRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async addVote(id: string, userId: string, pollId: string) {
    try {
      const poll = await this.pollsRepository.findOne(pollId, {
        relations: ['votedUsers'],
      });
      const votingUser = await this.userRepository.findOne(userId);

      const date = new Date();

      if (date > poll.endTime) {
        return {
          success: false,
          message: 'Voting Period is over.',
          userId,
        };
      }

      if (date < poll.startTime) {
        return {
          success: false,
          message: 'Voting Period has not started yet.',
          userId,
        };
      }

      const { votedUsers } = poll;

      let found = false;

      if (votedUsers) {
        const idx = votedUsers.findIndex((u) => u.id === userId);

        if (idx !== -1) found = true;
      }

      if (!found) {
        await this.pollsRepository.save({
          ...poll,
          voteCount: poll.voteCount + 1,
          votedUsers: poll.votedUsers
            ? [...poll.votedUsers, votingUser]
            : [votingUser],
        });

        const rivalToBeVoted = await this.rivalsRepository.findOne(id);

        const updatedRival = this.rivalsRepository.create({
          ...rivalToBeVoted,
          votes: rivalToBeVoted.votes + 1,
          users: rivalToBeVoted.users
            ? [...rivalToBeVoted.users, votingUser]
            : [votingUser],
        });
        const final = await this.rivalsRepository.save(updatedRival);

        return {
          id: final.id,
          title: final.title,
          votes: final.votes,
          userId,
          success: true,
          message: 'Your vote has been counted successfully',
        };
      }
      return {
        success: false,
        message: 'Only 1 vote per user allowed.',
        userId,
      };
    } catch (e) {
      return {
        success: false,
        message: 'Server Error. Please Try Again',
        userId,
      };
    }
  }
}
