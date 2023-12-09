import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { validateEnvVariables } from './schemas/server-env-schemas';
import { envs } from './constant/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  validateEnvVariables(envs);

  app.setGlobalPrefix('api/v1', { exclude: ['/'] });

  app.use(helmet());

  app.enableCors({
    //! Should be changed to the production client URL
    // origin: 'http://localhost:3000',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(Number(process.env.PORT) || 8000);
}
bootstrap();
