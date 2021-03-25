import { Module } from '@nestjs/common';
import { PollsModule } from 'src/polls/polls.module';
import { VoteGateway } from './vote.gateway';
import { VoteService } from './strategies/vote.service';

@Module({
  imports: [PollsModule],
  providers: [VoteGateway, VoteService],
})
export class VoteModule {}
