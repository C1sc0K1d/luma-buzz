import { Component } from '@angular/core';
import { HOME_DATA, formatCount, ratingPresentation } from '../home-data';
@Component({
  selector: 'app-intro-section',
  templateUrl: './intro-section.html',
  styleUrl: './intro-section.scss',
})
export class IntroSection {
  protected readonly data = HOME_DATA;
  protected readonly formatCount = formatCount;
  protected get rating() {
    return ratingPresentation(this.data.rating);
  }
}
