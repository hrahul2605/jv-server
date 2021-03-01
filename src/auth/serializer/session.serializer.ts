import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/strategies/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.googleID);
  }
  async deserializeUser(
    googleID: string,
    done: (err: Error, payload: any) => void,
  ): Promise<any> {
    const foundUser = await this.userService.findOne(googleID);
    done(null, foundUser);
  }
}
