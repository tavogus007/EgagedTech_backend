// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  logger.log(`🚀 Servidor corriendo en: http://localhost:${port}`);
  logger.log(`📧 Endpoint de email: http://localhost:${port}/email/send`);
  logger.log(`🔧 Modo: ${process.env.NODE_ENV || 'development'}`);
}
bootstrap();