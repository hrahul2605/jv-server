import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';

@Controller('user')
export class UserController {
  @UseGuards(AuthenticatedGuard)
  @Get()
  getUser(@Req() req) {
    return { ...req.user };
  }
}
