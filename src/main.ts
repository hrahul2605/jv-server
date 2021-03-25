import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import configuration from './config/configuration';
import { SocketIoAdapter } from './common/adapters/socket-io.adapter';

async function initialize(
  app: INestApplication,
  config: ReturnType<typeof configuration>,
) {
  app.useWebSocketAdapter(new SocketIoAdapter(app, true));
  app.enableCors({
    credentials: true,
    origin: config.corsOrigin,
  });
  app.use(
    session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
}

async function bootstrap() {
  const config = configuration();

  const app = await NestFactory.create(AppModule);

  await initialize(app, config);

  await app.listen(config.port);
}
bootstrap();
