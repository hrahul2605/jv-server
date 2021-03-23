import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import { SocketIoAdapter } from './common/adapters/socket-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new SocketIoAdapter(app, true));
  app.enableCors({
    credentials: true,
    origin: configuration().corsOrigin,
  });
  const config = configuration();
  app.use(
    session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(config.port);
}
bootstrap();
