import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/strategies/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  googleLogin(req) {
    if (!req.user) {
      return null;
    }

    return {
      ...req.user,
    };
  }
}
