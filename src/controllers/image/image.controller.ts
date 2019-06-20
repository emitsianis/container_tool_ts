import { Controller, Body, Post, HttpException } from '@nestjs/common';
import { PullImageDto } from '../../dto/pull-image.dto';
import { DockerService } from '../../services/docker/docker.service';
import { handleErrorCode } from '../../helperFunctions/helper-functions';

@Controller('image')
export class ImageController {
  constructor(private dockerService: DockerService) {}
  //Pull an imgae by name from dockerhub
  @Post()
  async pullImage(@Body() pullImageDto: PullImageDto) {
    try {
      await this.dockerService.pullImage(pullImageDto);
      return { ok: true };
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
