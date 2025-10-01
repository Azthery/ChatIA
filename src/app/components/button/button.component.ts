import { Component } from '@angular/core';

@Component({
  selector: '[app-button]',
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  constructor() {
    console.log('Button component loaded');
  }
}
