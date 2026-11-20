import { Component } from '@angular/core';
import { HomePage } from './features/home/home-page';

@Component({
  selector: 'app-root',
  imports: [HomePage],
  template: '<app-home-page />',
})
export class App {}
