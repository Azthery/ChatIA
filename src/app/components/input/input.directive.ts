import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[input]'
})
export class InputDirective {

  constructor(public elementRef: ElementRef) { }

}
