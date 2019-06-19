import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit, OnDestroy {
  errors: string[] = [];
  alertSubscription: Subscription;
  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertSubscription = this.alertService.errorsChanged.subscribe(
      errors => {
        this.errors = errors;
      },
    );
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }
}
