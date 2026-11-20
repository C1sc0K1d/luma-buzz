import { Component, output } from '@angular/core';
import { HomeDetailKey } from '../home-content';
import { HOME_DATA, courseFacts } from '../home-data';

@Component({
  selector: 'app-learning-section',
  templateUrl: './learning-section.html',
  styleUrl: './learning-section.scss',
})
export class LearningSection {
  protected readonly course = HOME_DATA.featuredCourse;
  protected readonly facts = courseFacts(this.course);
  readonly explore = output<HomeDetailKey>();
  protected readonly categories: readonly { name: HomeDetailKey; description: string }[] = [
    {
      name: 'Product Design',
      description: 'Turn complex problems into clear, useful experiences.',
    },
    {
      name: 'Technology',
      description: 'Build a stronger understanding of the tools shaping digital products.',
    },
    {
      name: 'Business',
      description: 'Develop practical skills for better decisions and stronger teams.',
    },
    { name: 'Creative', description: 'Explore new ways to communicate, create and tell stories.' },
  ];
  protected readonly steps = [
    {
      title: 'Choose your focus',
      description:
        'Find courses based on the skill you want to build, not endless content categories.',
    },
    {
      title: 'Learn from experience',
      description: 'Follow concise lessons created by professionals who actually use these skills.',
    },
    {
      title: 'Put it into practice',
      description:
        'Every course includes practical exercises designed to turn knowledge into action.',
    },
  ];
}
