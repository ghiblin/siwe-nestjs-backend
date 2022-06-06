import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
  app.use(session({
    // TODO: retrieve configuration from .env file
    name: 'siwe-session',
    secret: 'my-secret',
    resave: true,
    saveUninitialized: true,
    // TODO: chance to secure cookie for production
    cookie: { secure: false, sameSite: true }
  }))
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
