import { Controller, Get } from '@nestjs/common';

@Controller('image')
export class ImageController {
  //Pull an imgae by name from dockerhub
  @Get()
  pullImage() {}
}
