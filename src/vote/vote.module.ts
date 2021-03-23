import { Module } from '@nestjs/common';
import { VoteGateway } from './vote.gateway';

@Module({
  providers: [VoteGateway],
})
export class VoteModule {}
