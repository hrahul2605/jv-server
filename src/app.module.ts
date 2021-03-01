import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import configuration from './config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({ load: [configuration] }),
  ],
  controllers: [AppController],
})
export class AppModule {}
