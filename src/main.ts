import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyloggerProvider } from './providers/mylogger/mylogger.provider/mylogger.provider';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  //OpenAPI
  const baseDocument = new DocumentBuilder()
    .setTitle('Operation-Management')
    .setDescription('The operation management API description')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const fullDocument = SwaggerModule.createDocument(app, baseDocument);
  SwaggerModule.setup('api', app, fullDocument);
  const port = configService.get('PORT');

  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(port || 3001);
}
bootstrap();
