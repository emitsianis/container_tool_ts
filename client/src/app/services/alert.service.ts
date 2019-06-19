import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts: string[] = [];
  alertsChanged = new Subject<string[]>();

  constructor() {}

  setAlert(message: string) {
    this.alerts.unshift(message);
    this.alertsChanged.next(this.alerts);

    setTimeout(() => {
      this.alerts.pop();
      this.alertsChanged.next(this.alerts);
    }, 4000);
  }
}
