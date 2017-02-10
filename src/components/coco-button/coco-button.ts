import { Component } from '@angular/core';

/*
  Generated class for the CocoButton component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'coco-button',
  templateUrl: 'coco-button.html'
})
export class CocoButtonComponent {

  text: string;

  constructor() {
    console.log('Hello CocoButton Component');
    this.text = 'Hello World';
  }

  cagar() {
    console.log('Tô cagando!')
  }
}
