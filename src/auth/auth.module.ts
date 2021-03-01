import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './strategies/auth.service';
import { SessionSerializer } from './serializer/session.serializer';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ session: true, defaultStrategy: 'google' }),
    UserModule,
  ],
  providers: [AuthService, GoogleStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
