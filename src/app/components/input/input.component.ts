import { Component, ContentChild } from '@angular/core';
import { InputDirective } from './input.directive';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  host: {
    'class': 'app-input'
  }
})
export class InputComponent {

  @ContentChild(InputDirective) inputDirective!: InputDirective;
}
