import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyloggerProvider } from './providers/mylogger/mylogger.provider/mylogger.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //enable or disable logger service
    // logger: false,
  });
  const configService = app.get(ConfigService);
  const cors = configService.get('CORS') === 'true';
  cors && app.enableCors();
  const logger = configService.get('LOGGER') === 'true';
  logger && app.useLogger(new MyloggerProvider(configService));
  // if (logger) {
  //   app.useLogger(new MyloggerProvider(configService));
  // }
  const port = configService.get('PORT');
  console.log(configService.get('CORS'));
  console.log(port);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(port || 3001);
}
bootstrap();
