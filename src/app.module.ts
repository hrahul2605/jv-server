import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { PollsModule } from './polls/polls.module';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ load: [configuration] }),
    AuthModule,
    UserModule,
    PollsModule,
    VoteModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
