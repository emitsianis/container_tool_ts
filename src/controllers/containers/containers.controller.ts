import { Controller, Get, Post, Delete } from '@nestjs/common';

@Controller('containers')
export class ContainersController {
  //Return list of all containers
  @Get()
  listAll() {}

  //Create a new container from a given image name
  @Post()
  create() {}

  //Start a container by id
  @Get('start/:id')
  start() {}

  //Stop a container by id
  @Get('stop/:id')
  stop() {}

  //Get container stats by id
  @Get('stats/:id')
  stats() {}

  //Get container logs by id
  @Get('logs/:id')
  logs() {}

  //Delete a container by id
  @Delete(':id')
  delete() {}
}
