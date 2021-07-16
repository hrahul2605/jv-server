import { Module } from '@nestjs/common';
import { PollsModule } from 'src/polls/polls.module';
import { VoteGateway } from './vote.gateway';
import { VoteService } from './strategies/vote.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PollsModule, UserModule],
  providers: [VoteGateway, VoteService],
})
export class VoteModule {}
