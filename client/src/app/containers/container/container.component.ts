import { Component, Input } from '@angular/core';
import { Container } from 'src/app/models/container';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
})
export class ContainerComponent {
  @Input() container: Container;

  constructor() {}
}
