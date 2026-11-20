import { Component } from '@angular/core';
import { HOME_DATA, formatCount } from '../home-data';

@Component({
  selector: 'app-community-section',
  templateUrl: './community-section.html',
  styleUrl: './community-section.scss',
})
export class CommunitySection {
  protected readonly data = HOME_DATA;
  protected readonly formatCount = formatCount;
  protected readonly photos = [
    { file: 1, alt: 'A student taking part in an online class' },
    { file: 2, alt: 'Students working together around a laptop' },
    { file: 3, alt: 'A student studying in the library' },
    { file: 4, alt: 'A music teacher helping a student practise singing' },
    { file: 5, alt: 'A learner writing notes at his desk' },
    { file: 6, alt: 'A graduate celebrating an achievement' },
    { file: 7, alt: 'A student learning from home' },
    { file: 8, alt: 'An instructor teaching an online lesson' },
    { file: 9, alt: 'A student carrying books on campus' },
    { file: 10, alt: 'A woman carrying books and a cup of coffee' },
  ];
}
