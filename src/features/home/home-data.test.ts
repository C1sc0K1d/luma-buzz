import { describe, expect, it } from 'vitest';
import { HOME_DATA, courseFacts, formatCount, ratingPresentation } from './home-data';
import { validateContact } from './contact-validation';

describe('Editable business values', () => {
  it.each([
    [0, [0, 0, 0, 0, 0]],
    [3.5, [100, 100, 100, 50, 0]],
    [5, [100, 100, 100, 100, 100]],
    [9, [100, 100, 100, 100, 100]],
    [-1, [0, 0, 0, 0, 0]],
    [NaN, [0, 0, 0, 0, 0]],
  ] as const)('fills stars for rating %s', (rating, fills) => {
    expect(ratingPresentation(rating).fills).toEqual(fills);
  });
  it('formats counts and course facts from numbers', () => {
    expect(formatCount(32500)).toBe('32,500');
    expect(formatCount(32500, true)).toBe('32.5K');
    expect(courseFacts({ ...HOME_DATA.featuredCourse, lessons: 1, durationMinutes: 60 })).toEqual([
      '1 lesson',
      '1h',
      'Intermediate',
    ]);
  });
});

describe('Contact validation', () => {
  const valid = {
    name: 'Alex',
    email: 'alex+courses@example.co.uk',
    question: 'A course question',
  };
  it('accepts a valid address and exactly 1500 characters', () => {
    expect(validateContact({ ...valid, question: 'a'.repeat(1500) }, 1500)).toEqual({});
  });
  it('rejects overlong questions even if the browser limit is bypassed', () => {
    expect(validateContact({ ...valid, question: 'a'.repeat(1501) }, 1500).question).toContain(
      '1500',
    );
  });
  it('rejects blank fields and whitespace-only values', () => {
    expect(Object.keys(validateContact({ name: ' ', email: ' ', question: ' ' }, 1500))).toEqual([
      'name',
      'email',
      'question',
    ]);
  });
  it.each([
    'alex@',
    'alex@example',
    'alex @example.com',
    'alex@example..com',
    '.alex@example.com',
    'alex@-example.com',
  ])('rejects invalid email %s', (email) => {
    expect(validateContact({ ...valid, email }, 1500).email).toBeDefined();
  });
});
