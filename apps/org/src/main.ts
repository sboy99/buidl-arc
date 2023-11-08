import { AllExceptionsFilter } from '@app/common/filters';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { Logger } from 'nestjs-pino';
import { TOrgEnv } from './env';
import { OrgModule } from './org.module';

async function bootstrap() {
  const app = await NestFactory.create(OrgModule);
  const configService = app.get<ConfigService<TOrgEnv>>(ConfigService);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    }),
  );

  // logger
  app.useLogger(app.get(Logger));

  // cookie
  const cookieSecret = configService.get('COOKIE_SECRET');
  app.use(cookieParser(cookieSecret));

  // port
  await app.listen(configService.getOrThrow<number>('HTTP_PORT'));
}
bootstrap();
