import { Component, OnInit } from '@angular/core';
import { DockerService } from '../services/docker.service';
import { Container } from '../models/container';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
})
export class ContainersComponent implements OnInit {
  containers: Container[];
  loading: boolean = true;

  constructor(private dockerService: DockerService) {}

  ngOnInit() {
    this.dockerService.getContainers().subscribe(containers => {
      this.containers = containers;
      this.loading = false;
    });
  }
}
