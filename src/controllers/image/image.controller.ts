import { Controller, Body, Post } from '@nestjs/common';
import { PullImageDto } from '../../dto/pull-image.dto';
import { DockerService } from '../../services/docker/docker.service';

@Controller('image')
export class ImageController {
  constructor(private dockerService: DockerService) {}
  //Pull an imgae by name from dockerhub
  @Post()
  async pullImage(@Body() pullImageDto: PullImageDto) {
    try {
      await this.dockerService.pullImage(pullImageDto);
      return { ok: true };
    } catch (error) {
      return error;
    }
  }
}
