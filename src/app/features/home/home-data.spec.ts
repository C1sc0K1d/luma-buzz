import { TestBed } from '@angular/core/testing';
import { IntroSection } from './intro-section/intro-section';
import { HOME_DATA, formatCount, ratingPresentation, courseFacts } from './home-data';

describe('Editable home data', () => {
  it.each([
    [0, [0, 0, 0, 0, 0]],
    [3.5, [100, 100, 100, 50, 0]],
    [5, [100, 100, 100, 100, 100]],
    [9, [100, 100, 100, 100, 100]],
    [-1, [0, 0, 0, 0, 0]],
    [NaN, [0, 0, 0, 0, 0]],
  ])('fills the stars consistently for rating %s', (score, fills) => {
    expect(ratingPresentation(score).fills).toEqual(fills);
  });

  it('updates rating text, accessible name and partial stars from the same value', async () => {
    const original = HOME_DATA.rating;
    try {
      HOME_DATA.rating = 3.5;
      const fixture = TestBed.createComponent(IntroSection);
      await fixture.whenStable();
      const page = fixture.nativeElement as HTMLElement;
      expect(page.querySelector('.intro__rating-badge')?.textContent).toContain('3.5 avg rating');
      expect(page.querySelector('[aria-label="3.5 out of 5 average rating"]')).not.toBeNull();
      expect(
        [...page.querySelectorAll<HTMLElement>('.intro__star-fill')].map(
          (star) => star.style.width,
        ),
      ).toEqual(['100%', '100%', '100%', '50%', '0%']);
    } finally {
      HOME_DATA.rating = original;
    }
  });

  it('formats changing counts and course details without template changes', () => {
    expect(formatCount(32500)).toBe('32,500');
    expect(formatCount(32500, true)).toBe('32.5K');
    expect(courseFacts({ ...HOME_DATA.featuredCourse, lessons: 1, durationMinutes: 60 })).toEqual([
      '1 lesson',
      '1h',
      HOME_DATA.featuredCourse.level,
    ]);
  });
});
