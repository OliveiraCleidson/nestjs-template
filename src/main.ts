import 'reflect-metadata';
import 'dotenv/config';
import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { helloWorld } from '@/core/hello';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ['*'],
    },
  });

  // Security
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    }),
  );

  // Swagger Configuration
  const options = new DocumentBuilder()
    .setTitle('Falcor App')
    .setDescription('The Api is created for Falcor App')
    .setVersion('0.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 5001);
  helloWorld();
}

bootstrap();
