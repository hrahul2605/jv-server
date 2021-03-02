import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollsController } from './polls.controller';
import { PollsRepository } from './repositories/polls.repository';
import { RivalsRepository } from './repositories/rivals.repository';
import { PollsService } from './strategies/polls.service';

@Module({
  imports: [TypeOrmModule.forFeature([PollsRepository, RivalsRepository])],
  controllers: [PollsController],
  providers: [PollsService],
  exports: [TypeOrmModule],
})
export class PollsModule {}
