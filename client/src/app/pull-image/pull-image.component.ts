import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DockerService } from '../services/docker.service';
import { AlertService } from '../services/alert.service';
import { ApiResponse } from '../models/api-response';

@Component({
  selector: 'app-pull-image',
  templateUrl: './pull-image.component.html',
})
export class PullImageComponent implements OnInit {
  @ViewChild('inputForm', { static: false }) form: NgForm;
  loading: boolean = false;

  constructor(
    private dockerService: DockerService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {}

  onSubmit() {
    const { imageName } = this.form.form.value;

    if (!imageName) {
      this.alertService.setAlert('Please provide an image name.');
      return;
    }

    this.alertService.setAlert(`Pulling image ${imageName}...`);
    this.loading = true;

    this.dockerService.pullImage(this.form.form.value).subscribe(
      (resData: ApiResponse) => {
        if (resData.ok) {
          this.loading = false;
          this.alertService.setAlert(`Image ${imageName} pulled successfully.`);
        }

        if (resData.status) {
          if (resData.status === 404) {
            this.loading = false;
            this.alertService.setAlert(
              `Image ${imageName} not found on Docker Hub.`,
            );
          }
        }
      },
      err => {
        this.loading = false;
        this.alertService.setAlert(err.message);
      },
    );
  }
}
