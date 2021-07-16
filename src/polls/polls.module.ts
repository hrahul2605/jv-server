import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { PollsController } from './polls.controller';
import { PollsRepository } from './repositories/polls.repository';
import { RivalsRepository } from './repositories/rivals.repository';
import { PollsService } from './strategies/polls.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PollsRepository, RivalsRepository]),
    UserModule,
  ],
  controllers: [PollsController],
  providers: [PollsService],
  exports: [TypeOrmModule],
})
export class PollsModule {}
