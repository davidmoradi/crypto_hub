import { Component, ViewEncapsulation } from '@angular/core';
import { CoinsComponent } from '../coins/coins.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  loadingIndicator: boolean = true

  constructor() { }

  receiveMessage(showLoadingIndicator) {
    this.loadingIndicator = showLoadingIndicator
  }

}
