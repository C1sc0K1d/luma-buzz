import { TestBed } from '@angular/core/testing';
import { ContactSection } from './contact-section';

function fill(page: HTMLElement, name: string, value: string): void {
  const input = page.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`)!;
  input.value = value;
  input.dispatchEvent(new Event('input', { bubbles: true }));
}
function submit(page: HTMLElement): void {
  page
    .querySelector('form')!
    .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
}

describe('Contact form accessibility and feedback', () => {
  it('focuses the first invalid field and associates its English error', async () => {
    const fixture = TestBed.createComponent(ContactSection);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    submit(page);
    await fixture.whenStable();
    const name = page.querySelector<HTMLInputElement>('[name="name"]')!;
    expect(document.activeElement).toBe(name);
    expect(name.getAttribute('aria-invalid')).toBe('true');
    expect(name.getAttribute('aria-describedby')).toBe('name-error');
    expect(page.querySelector('#name-error')?.textContent).toContain('Please enter your name.');
    expect(page.querySelector('[role="alert"]')?.textContent).toContain(
      'check the highlighted fields',
    );
    expect(page.querySelector('a[href^="mailto:"]')?.getAttribute('href')).toBe(
      'mailto:contact@luma.com',
    );
    expect(page.querySelector('[role="status"]')).toBeNull();
  });

  it('rejects whitespace and moves focus to the invalid email after the name is corrected', async () => {
    const fixture = TestBed.createComponent(ContactSection);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    fill(page, 'name', ' ');
    fill(page, 'email', 'not-an-email');
    fill(page, 'question', ' ');
    submit(page);
    await fixture.whenStable();
    expect(page.querySelectorAll('[aria-invalid="true"]')).toHaveLength(3);
    fill(page, 'name', 'Alex');
    submit(page);
    await fixture.whenStable();
    expect(document.activeElement).toBe(page.querySelector('[name="email"]'));
  });

  it('emits a valid submission and resets values and validation state', async () => {
    const fixture = TestBed.createComponent(ContactSection);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const submitted = vi.fn();
    fixture.componentInstance.messageSubmitted.subscribe(submitted);
    fill(page, 'name', 'Alex & Sam');
    fill(page, 'email', 'alex@example.com');
    fill(page, 'question', 'Design & technology?\nI would like to learn both.');
    submit(page);
    await fixture.whenStable();
    expect(submitted).toHaveBeenCalledWith(page.querySelector('button[type="submit"]'));
    for (const input of page.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      'input, textarea',
    )) {
      expect(input.value).toBe('');
      expect(input.getAttribute('aria-invalid')).toBe('false');
    }
    expect(page.querySelector('[role="alert"]')).toBeNull();
    expect(page.querySelector('#question-hint')?.textContent).toContain('0 / 1500');
  });

  it.each(['alex@', 'alex@example', 'alex @example.com', 'alex@example..com'])(
    'rejects malformed email %s without resetting the fields',
    async (email) => {
      const fixture = TestBed.createComponent(ContactSection);
      await fixture.whenStable();
      const page = fixture.nativeElement as HTMLElement;
      const submitted = vi.fn();
      fixture.componentInstance.messageSubmitted.subscribe(submitted);
      fill(page, 'name', 'Alex');
      fill(page, 'email', email);
      fill(page, 'question', 'A course question');
      submit(page);
      await fixture.whenStable();
      expect(submitted).not.toHaveBeenCalled();
      expect(page.querySelector<HTMLInputElement>('[name="email"]')!.value).toBe(email);
      expect(document.activeElement).toBe(page.querySelector('[name="email"]'));
    },
  );

  it('accepts 1500 characters and rejects a programmatically supplied 1501st character', async () => {
    const fixture = TestBed.createComponent(ContactSection);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;
    const submitted = vi.fn();
    fixture.componentInstance.messageSubmitted.subscribe(submitted);
    fill(page, 'name', 'Alex');
    fill(page, 'email', 'alex+courses@example.co.uk');
    fill(page, 'question', 'a'.repeat(1501));
    submit(page);
    await fixture.whenStable();
    expect(page.querySelector('textarea')!.maxLength).toBe(1500);
    expect(submitted).not.toHaveBeenCalled();
    expect(page.querySelector('#question-error')?.textContent).toContain('1500 characters');
    expect(document.activeElement).toBe(page.querySelector('textarea'));
    fill(page, 'question', 'a'.repeat(1500));
    submit(page);
    await fixture.whenStable();
    expect(submitted).toHaveBeenCalledOnce();
  });
});
