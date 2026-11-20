import { TestBed } from '@angular/core/testing';
import { HomePage } from './home-page';

describe('Home page navigation', () => {
  it('closes the menu on an outside click, but leaves clicks inside and the toggle alone', async () => {
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const toggle = page.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]')!;
    const menu = page.querySelector<HTMLElement>('#mobile-menu')!;
    toggle.click();
    await fixture.whenStable();
    expect(menu.hidden).toBe(false);
    menu.click();
    await fixture.whenStable();
    expect(menu.hidden).toBe(false);
    const outside = page.querySelector<HTMLInputElement>('.contact-form input[name="email"]')!;
    outside.focus();
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();
    expect(menu.hidden).toBe(true);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(outside);
    toggle.click();
    await fixture.whenStable();
    toggle.click();
    await fixture.whenStable();
    expect(menu.hidden).toBe(true);
  });

  it('shows the demo contact confirmation, resets the form and restores focus on close', async () => {
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const dialog = page.querySelector('dialog')!;
    dialog.showModal = vi.fn(() => {
      dialog.open = true;
    });
    for (const [name, value] of Object.entries({
      name: 'Alex',
      email: 'alex@example.com',
      question: 'Tell me about the courses.',
    })) {
      const input = page.querySelector<HTMLInputElement>(`[name="${name}"]`)!;
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    const button = page.querySelector<HTMLButtonElement>('.contact-form button[type="submit"]')!;
    button.click();
    await fixture.whenStable();
    expect(dialog.showModal).toHaveBeenCalledOnce();
    expect(dialog.textContent).toContain('Message sent — simulation');
    expect(dialog.textContent).toContain('24 business hours');
    expect(dialog.textContent).toContain('no message has been delivered');
    expect(page.querySelector<HTMLInputElement>('[name="email"]')!.value).toBe('');
    expect(page.querySelector('[role="alert"]')).toBeNull();
    dialog.dispatchEvent(new Event('close'));
    expect(document.activeElement).toBe(button);
  });
  it('resolves all in-page links to an existing destination', async () => {
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('.course-card')).toHaveLength(4);
    for (const link of page.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')) {
      expect(page.querySelector(link.getAttribute('href')!), link.textContent ?? '').not.toBeNull();
    }
  });

  it('keeps the controlled menu present and closes it with Escape, returning focus', async () => {
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const toggle = page.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]')!;
    const menu = page.querySelector<HTMLElement>('#mobile-menu')!;
    expect(menu.hidden).toBe(true);
    toggle.click();
    await fixture.whenStable();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(menu.hidden).toBe(false);
    menu.querySelector<HTMLAnchorElement>('a')!.focus();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    expect(menu.hidden).toBe(true);
    expect(document.activeElement).toBe(toggle);
  });

  it('moves focus to the section selected from the mobile menu', async () => {
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    page.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]')!.click();
    await fixture.whenStable();
    page.querySelector<HTMLAnchorElement>('#mobile-menu a[href="#courses"]')!.click();
    await fixture.whenStable();
    expect(document.activeElement).toBe(page.querySelector('#courses'));
    expect(page.querySelector<HTMLElement>('#mobile-menu')!.hidden).toBe(true);
  });
});
