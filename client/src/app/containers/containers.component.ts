import { Component, OnInit, OnDestroy } from '@angular/core';
import { DockerService } from '../services/docker.service';
import { Container } from '../models/container';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
})
export class ContainersComponent implements OnInit, OnDestroy {
  containers: Container[];
  loading: boolean = true;
  containerSubscription: Subscription;

  constructor(private dockerService: DockerService) {}

  ngOnInit() {
    this.containerSubscription = this.dockerService.containersChanged.subscribe(
      containers => {
        this.loading = true;
        this.containers = containers;
        this.loading = false;
      },
    );

    this.dockerService.updateContainers();
  }

  ngOnDestroy() {
    this.containerSubscription.unsubscribe();
  }
}
