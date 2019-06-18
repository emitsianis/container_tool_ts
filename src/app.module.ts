import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContainersController } from './controllers/containers/containers.controller';
import { ImageController } from './controllers/image/image.controller';

@Module({
  imports: [],
  controllers: [AppController, ContainersController, ImageController],
  providers: [AppService],
})
export class AppModule {}
