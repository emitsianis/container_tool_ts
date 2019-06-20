import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Docker } from 'node-docker-api';

import { keys } from '../../config/keys';
import { PullImageDto } from '../../dto/pull-image.dto';
import { Container, ContainerResponse } from '../../models/container';
import { CreateContainerDto } from '../../dto/create-container.dto';
import { handleErrorCode } from '../../helperFunctions/helper-functions';
const { socketPath } = keys;

@Injectable()
export class DockerService {
  async pullImage(pullImageDto: PullImageDto) {
    const { imageName } = pullImageDto;
    const docker = new Docker({ socketPath });

    try {
      return await docker.image.create(
        {},
        { fromImage: imageName, tag: 'latest' },
      );
    } catch (err) {
      throw new HttpException(err.message, handleErrorCode(err.status));
    }
  }

  async listContainers(all: boolean) {
    const docker = new Docker({ socketPath });
    const containerListArray: Container[] = [];

    try {
      const containerList = await docker.container.list({ all });

      for (const containerEl of containerList) {
        containerListArray.push({
          id: (<ContainerResponse>containerEl.data).Id,
          names: (<ContainerResponse>containerEl.data).Names,
          image: (<ContainerResponse>containerEl.data).Image,
          ports: (<ContainerResponse>containerEl.data).Ports,
          state: (<ContainerResponse>containerEl.data).State,
          status: (<ContainerResponse>containerEl.data).Status,
        });
      }

      return containerListArray;
    } catch (err) {
      throw new HttpException(err.mesage, handleErrorCode(err.status));
    }
  }

  async createContainer(createContainerDto: CreateContainerDto) {
    const docker = new Docker({ socketPath });

    const {
      imageName,
      containerName,
      privatePort,
      publicPort,
    } = createContainerDto;

    const options = {
      Image: imageName,
      name: containerName,
      HostConfig: {
        PortBindings: {},
      },
      ExposedPorts: {},
    };

    options.HostConfig.PortBindings[`${privatePort}/tcp`] = [
      { HostPort: publicPort },
    ];
    options.ExposedPorts[`${privatePort}/tcp`] = {};

    try {
      await docker.container.create(options);
      return { ok: true };
    } catch (err) {
      throw new HttpException(err.message, handleErrorCode(err.status));
    }
  }

  async startContainer(id: string) {
    const docker = new Docker({ socketPath });

    let found = false;

    try {
      const containerList = await docker.container.list({ all: true });

      for (const containerEl of containerList) {
        if ((<ContainerResponse>containerEl.data).Id === id) {
          found = true;
          await containerEl.start();
          return { ok: true };
        }
      }

      if (!found) {
        throw new HttpException('Container not found', 404);
      }
    } catch (err) {
      throw new HttpException(err.message, handleErrorCode(err.status));
    }
  }

  async stopContainer(id: string) {
    const docker = new Docker({ socketPath });

    let found = false;

    try {
      const containerList = await docker.container.list({ all: true });

      for (const containerEl of containerList) {
        if ((<ContainerResponse>containerEl.data).Id === id) {
          found = true;
          await containerEl.stop();
          return { ok: true };
        }
      }

      if (!found) {
        throw new HttpException('Container not found', 404);
      }
    } catch (err) {
      throw new HttpException(err.message, handleErrorCode(err.status));
    }
  }

  async getContainerStats(id: string) {
    const docker = new Docker({ socketPath });

    let found = false;

    try {
      const containerList = await docker.container.list({ all: true });

      for (const containerEl of containerList) {
        if ((<ContainerResponse>containerEl.data).Id === id) {
          found = true;

          return await new Promise((resolve, reject) => {
            containerEl.stats().then(stats => {
              (<NodeJS.EventEmitter>stats).on('data', stat => {
                const str = JSON.parse(stat.toString());

                const containerStats = {
                  basic: {
                    name: (<ContainerResponse>(
                      containerEl.data
                    )).Names[0].replace('/', ''),
                    image: (<ContainerResponse>containerEl.data).Image,
                    status: `${(<ContainerResponse>containerEl.data).State}, ${
                      (<ContainerResponse>containerEl.data).Status
                    }`,
                    id: (<ContainerResponse>containerEl.data).Id,
                    ports: (<ContainerResponse>containerEl.data).Ports,
                  },
                  resource: str,
                };

                resolve(containerStats);
              });
              (<NodeJS.EventEmitter>stats).on('error', err => {
                reject(err);
              });
            });
          });
        }
      }

      if (!found) {
        throw new HttpException('Container not found', 404);
      }
    } catch (err) {
      throw new HttpException(err.message, handleErrorCode(err.status));
    }
  }

  async deleteContainer(id: string) {
    const docker = new Docker({ socketPath });

    let found = false;

    try {
      const containerList = await docker.container.list({ all: true });

      for (const containerEl of containerList) {
        if ((<ContainerResponse>containerEl.data).Id === id) {
          found = true;
          await containerEl.delete({ force: true });
          return { ok: true };
        }
      }

      if (!found) {
        throw new HttpException('Container not found', 404);
      }
    } catch (err) {
      throw new HttpException(err.message, handleErrorCode(err.status));
    }
  }
}
