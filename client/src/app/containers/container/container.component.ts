import { Component, Input } from '@angular/core';
import { Container } from '../../models/container';
import { DockerService } from '../../services/docker.service';
import { Router } from '@angular/router';
import { ApiResponse } from '../../models/api-response';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
})
export class ContainerComponent {
  @Input() container: Container;

  constructor(
    private dockerService: DockerService,
    private alertService: AlertService,
    private router: Router,
  ) {}

  onStartClick() {
    this.dockerService.startContainer(this.container.id).subscribe(
      (resData: ApiResponse) => {
        if (resData.ok) {
          this.dockerService.updateContainers();
        }
      },
      error => {
        this.alertService.setAlert(
          'Could not start container. Make sure its public port is not already in use.',
        );
      },
    );
  }

  onStopClick() {
    this.dockerService
      .stopContainer(this.container.id)
      .subscribe((resData: ApiResponse) => {
        if (resData.ok) {
          this.dockerService.updateContainers();
        }
      });
  }

  onDeleteClick() {
    if (confirm('Are you sure')) {
      this.dockerService
        .deleteContainer(this.container.id)
        .subscribe((resData: ApiResponse) => {
          if (resData.ok) {
            this.dockerService.updateContainers();
          }
        });
    }
  }
}
