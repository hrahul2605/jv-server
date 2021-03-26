import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from 'src/user/strategies/user.service';
import { AuthService } from './strategies/auth.service';
import { GoogleAuthGuard } from '../common/guards/google.guard';
import configuration from 'src/config/configuration';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const user = this.authService.googleLogin(req);
    if (user) {
      await this.userService.createUser({
        googleID: user.googleID,
        name: user.name,
        email: user.email,
        picture: user.picture,
      });
    }
    return res.redirect(configuration().googleRedirect);
  }

  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  async logoutUser(@Req() req) {
    req.logout();
    return { success: true };
  }
}
