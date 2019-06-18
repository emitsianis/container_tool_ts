import {
  Controller,
  Get,
  Post,
  Delete,
  Query,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DockerService } from '../../services/docker/docker.service';
import { CreateContainerDto } from '../../dto/create-container.dto';
import { handleErrorCode } from '../../helperFunctions/helper-functions';

@Controller('containers')
export class ContainersController {
  constructor(private dockerService: DockerService) {}

  //Return list of all containers
  @Get()
  async listAll(@Query('all') all: boolean) {
    try {
      return await this.dockerService.listContainers(all);
    } catch (err) {
      throw new HttpException(err.message, handleErrorCode(err.status));
    }
  }

  //Create a new container from a given image name
  @Post()
  async create(@Body() createContainerDto: CreateContainerDto) {
    try {
      return await this.dockerService.createContainer(createContainerDto);
    } catch (err) {
      throw new HttpException(err.message, handleErrorCode(err.status));
    }
  }

  //Start a container by id
  @Get('start/:id')
  async start(@Param('id') id: string) {
    try {
      return await this.dockerService.startContainer(id);
    } catch (err) {
      throw new HttpException(err.message, handleErrorCode(err.status));
    }
  }

  //Stop a container by id
  @Get('stop/:id')
  async stop(@Param('id') id: string) {
    try {
      return await this.dockerService.stopContainer(id);
    } catch (err) {
      throw new HttpException(err.message, handleErrorCode(err.status));
    }
  }

  //Get container stats by id
  @Get('stats/:id')
  async stats(@Param('id') id: string) {
    try {
      return await this.dockerService.getContainerStats(id);
    } catch (err) {
      throw new HttpException(err.message, handleErrorCode(err.status));
    }
  }

  //Get container logs by id
  @Get('logs/:id')
  logs(@Param('id') id: string) {}

  //Delete a container by id
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.dockerService.deleteContainer(id);
    } catch (err) {
      throw new HttpException(err.message, handleErrorCode(err.status));
    }
  }
}
