import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', '..', 'client', 'dist', 'client'));
  app.setBaseViewsDir(join(__dirname, '..', '..', 'client', 'dist', 'client'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
