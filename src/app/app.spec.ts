import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  it('renders the home page with a keyboard focusable skip-link target', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain('Build skills that');
    expect(page.querySelector('main')?.getAttribute('tabindex')).toBe('-1');
    expect(page.querySelector('.skip-link')?.getAttribute('href')).toBe('#main');
  });
});
