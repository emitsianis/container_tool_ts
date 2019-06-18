import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContainersController } from './controllers/containers/containers.controller';
import { ImageController } from './controllers/image/image.controller';
import { DockerService } from './services/docker/docker.service';

@Module({
  imports: [],
  controllers: [AppController, ContainersController, ImageController],
  providers: [AppService, DockerService],
})
export class AppModule {}
