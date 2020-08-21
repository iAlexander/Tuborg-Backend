import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from './src/core/logger';
import { configInstance } from './src/core/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: '*'},
    logger: ['error', 'warn', 'log', 'debug'],
  });

  app.useGlobalPipes(new ValidationPipe({
    forbidUnknownValues: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  const options = new DocumentBuilder()
    .setTitle('Tuborg')
    .setDescription('The Tuborg API description')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('api');

  const logger = app.get(Logger);

  await app.listen(configInstance.port);

  logger.info(`Server is running. Visit http://localhost:${configInstance.port}/api/docs to see Swagger UI`);
}

bootstrap();
