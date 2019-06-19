import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  errors: string[] = [];
  errorsChanged = new Subject<string[]>();

  constructor() {}

  newError(message: string) {
    this.errors.unshift(message);
    this.errorsChanged.next(this.errors);

    setTimeout(() => {
      this.errors.pop();
      this.errorsChanged.next(this.errors);
    }, 4000);
  }
}
