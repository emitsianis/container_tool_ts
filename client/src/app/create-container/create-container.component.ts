import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { DockerService } from '../services/docker.service';
import { ApiResponse } from '../models/api-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-container',
  templateUrl: './create-container.component.html',
})
export class CreateContainerComponent implements OnInit {
  @ViewChild('inputForm', { static: false }) form: NgForm;

  constructor(
    private dockerService: DockerService,
    private alertService: AlertService,
    private router: Router,
  ) {}

  ngOnInit() {}

  onSubmit() {
    const {
      containerName,
      imageName,
      privatePort,
      publicPort,
    } = this.form.form.value;

    if (!(containerName && imageName && privatePort && publicPort)) {
      this.alertService.newError('Please fill in all fields.');
      return;
    }

    if (
      !(parseInt(privatePort) > 1 && parseInt(privatePort) < 65536) ||
      !(parseInt(publicPort) > 1 && parseInt(publicPort) < 65536)
    ) {
      this.alertService.newError('Ports must be numbers between 1 and 65536.');
      return;
    }

    this.dockerService.createContainer(this.form.form.value).subscribe(
      (resData: ApiResponse) => {
        if (resData.ok) {
          this.router.navigate(['/']);
        }
      },
      error => {
        if (error.status === 404) {
          this.alertService.newError(
            `Image ${imageName} is not available, try pulling it.`,
          );
        } else {
          this.alertService.newError(
            'This name is already in use by another container.',
          );
        }
      },
    );
  }
}
