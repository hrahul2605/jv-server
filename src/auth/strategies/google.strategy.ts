import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import configuration from 'src/config/configuration';

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: configuration().clientId,
      clientSecret: configuration().clientSecret,
      callbackURL: 'http://localhost:5000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { emails, photos, id, displayName } = profile;
    const user = {
      googleID: id,
      email: emails[0].value,
      name: displayName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    return user;
  }
}
