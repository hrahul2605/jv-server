import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { PollsBodyDto, PollsDeleteDto } from './dto/polls.dto';
import { PollsService } from './strategies/polls.service';

@Controller('polls')
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Get(':id')
  async getPoll(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.pollsService.getPoll(id);
    return { data };
  }

  @Post()
  async createPoll(@Body() body: PollsBodyDto) {
    const data = await this.pollsService.createPoll(body);
    return { ...data };
  }

  @Delete()
  async deletePoll(@Body() body: PollsDeleteDto) {
    const deleted = await this.pollsService.deletePoll(body.id);
    return { deleted };
  }
}
