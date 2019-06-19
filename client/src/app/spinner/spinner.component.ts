import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styles: [
    `
      .lds-css.ng-scope {
        width: 200px;
        margin: auto;
        display: block;
      }
    `,
  ],
})
export class SpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
