import { TestBed } from '@angular/core/testing';
import { DetailDialog } from './detail-dialog';
import { HOME_DETAILS } from '../home-content';

describe('Detail dialog accessibility', () => {
  it('renders the name and initial focus target before invoking the native modal API', async () => {
    const fixture = TestBed.createComponent(DetailDialog);
    await fixture.whenStable();
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    // jsdom does not emulate browser focus trapping; that behavior is checked in the browser.
    const showModal = vi.fn(() => {
      expect(dialog.querySelector('#dialog-title')?.textContent).toContain('Product Design');
      expect(dialog.querySelector('[autofocus]')?.getAttribute('aria-label')).toBe('Close dialog');
      expect(dialog.getAttribute('aria-describedby')).toBe('dialog-description');
    });
    dialog.showModal = showModal;
    fixture.componentInstance.open(HOME_DETAILS['Product Design']);
    expect(showModal).not.toHaveBeenCalled();
    await fixture.whenStable();
    expect(showModal).toHaveBeenCalledOnce();
  });

  it('restores focus to the supplied trigger when the native close event fires', async () => {
    const fixture = TestBed.createComponent(DetailDialog);
    await fixture.whenStable();
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    const trigger = document.createElement('button');
    document.body.append(trigger);
    dialog.showModal = vi.fn();
    try {
      fixture.componentInstance.open(HOME_DETAILS.login, trigger);
      await fixture.whenStable();
      dialog.dispatchEvent(new Event('close'));
      expect(document.activeElement).toBe(trigger);
    } finally {
      trigger.remove();
    }
  });
  it('wraps Tab and Shift+Tab at the modal boundaries', async () => {
    const fixture = TestBed.createComponent(DetailDialog);
    await fixture.whenStable();
    const dialog = fixture.nativeElement.querySelector('dialog') as HTMLDialogElement;
    dialog.showModal = () => {
      dialog.open = true;
    };
    fixture.componentInstance.open(HOME_DETAILS.featured);
    await fixture.whenStable();
    const first = dialog.querySelector<HTMLButtonElement>('[autofocus]')!;
    const last = dialog.querySelector<HTMLButtonElement>('.button--secondary')!;
    first.focus();
    const reverse = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    first.dispatchEvent(reverse);
    expect(reverse.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(last);
    const forward = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    last.dispatchEvent(forward);
    expect(forward.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(first);
  });
});
