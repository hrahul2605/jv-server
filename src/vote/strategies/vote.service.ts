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

  async addVote(id: string, googleID: string, pollId: string) {
    try {
      const poll = await this.pollsRepository.findOne(pollId);
      const date = new Date();

      if (date > poll.endTime) {
        return {
          success: false,
          message: 'Voting Period is over.',
          googleID,
        };
      }

      if (date < poll.startTime) {
        return {
          success: false,
          message: 'Voting Period has not started yet.',
          googleID,
        };
      }
      if (!poll.votedUsers.includes(googleID)) {
        await this.pollsRepository.save({
          ...poll,
          voteCount: poll.voteCount + 1,
          votedUsers: poll.votedUsers.concat(googleID),
        });

        const rivalToBeVoted = await this.rivalsRepository.findOne(id);
        const votingUser = await this.userRepository.findByGoogleId(googleID);

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
          googleID,
          success: true,
          message: 'Your vote has been counted successfully',
        };
      }
      return {
        success: false,
        message: 'Only 1 vote per user allowed.',
        googleID,
      };
    } catch (e) {
      return {
        success: false,
        message: 'Server Error. Please Try Again',
        googleID,
      };
    }
  }
}
