import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';
import { HomeDetail } from '../home-content';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.html',
  styleUrl: './detail-dialog.scss',
})
export class DetailDialog {
  private readonly injector = inject(Injector);
  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('detailDialog');
  private returnTarget: HTMLElement | null = null;
  protected readonly detail = signal<HomeDetail | null>(null);
  protected readonly primaryAction = computed(
    () =>
      this.detail()?.primaryAction ?? {
        label: 'Get in touch',
        sectionId: 'contact',
      },
  );

  open(detail: HomeDetail, returnTarget?: HTMLElement): void {
    const dialog = this.dialog()?.nativeElement;
    this.returnTarget = returnTarget ?? (dialog?.ownerDocument.activeElement as HTMLElement | null);
    this.detail.set(detail);
    // A native dialog must have its accessible name and focusable content before it opens.
    afterNextRender(
      () => {
        if (dialog && !dialog.open) dialog.showModal();
      },
      { injector: this.injector },
    );
  }

  protected close(sectionId?: string): void {
    if (sectionId) {
      this.returnTarget =
        this.dialog()?.nativeElement.ownerDocument.getElementById(sectionId) ?? null;
    }
    this.dialog()?.nativeElement.close();
  }

  protected restoreFocus(): void {
    // Mobile navigation may be hidden by now; its toggle is passed explicitly as a fallback.
    if (this.returnTarget?.isConnected) this.returnTarget.focus({ preventScroll: true });
    this.returnTarget = null;
  }

  protected containTabFocus(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;
    const dialog = this.dialog()?.nativeElement;
    if (!dialog) return;
    const controls = dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (!first || !last) return;
    const active = dialog.ownerDocument.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  protected closeFromBackdrop(event: MouseEvent): void {
    if (event.target === this.dialog()?.nativeElement) this.close();
  }
}
