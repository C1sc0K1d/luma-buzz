import {
  Component,
  DOCUMENT,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { JoinSection } from './join-section/join-section';
import { IntroSection } from './intro-section/intro-section';
import { LearningSection } from './learning-section/learning-section';
import { CommunitySection } from './community-section/community-section';
import { ContactSection } from './contact-section/contact-section';
import { DetailDialog } from './detail-dialog/detail-dialog';
import { HOME_DETAILS, HomeDetailKey } from './home-content';
import { HOME_DATA } from './home-data';

@Component({
  selector: 'app-home-page',
  imports: [
    IntroSection,
    LearningSection,
    CommunitySection,
    ContactSection,
    DetailDialog,
    JoinSection,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private readonly document = inject(DOCUMENT);
  private readonly detailDialog = viewChild(DetailDialog);
  private readonly menuToggle = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');
  private readonly mobileMenu = viewChild<ElementRef<HTMLElement>>('mobileMenu');
  protected readonly data = HOME_DATA;
  protected readonly menuOpen = signal(false);

  @HostListener('document:click', ['$event'])
  protected closeMenuFromOutside(event: MouseEvent): void {
    if (!this.menuOpen()) return;
    const path = event.composedPath();
    const menu = this.mobileMenu()?.nativeElement;
    const toggle = this.menuToggle()?.nativeElement;
    if ((menu && path.includes(menu)) || (toggle && path.includes(toggle))) return;
    const focusWasInside = menu?.contains(this.document.activeElement);
    this.menuOpen.set(false);
    if (focusWasInside) toggle?.focus({ preventScroll: true });
  }

  protected confirmContact(trigger: HTMLButtonElement): void {
    this.detailDialog()?.open(HOME_DETAILS.contactConfirmation, trigger);
  }

  @HostListener('document:keydown.escape')
  protected closeMenu(): void {
    if (this.menuOpen()) {
      this.menuOpen.set(false);
      this.menuToggle()?.nativeElement.focus();
    }
  }

  protected openDetail(key: HomeDetailKey): void {
    const returnTarget = this.menuOpen() ? this.menuToggle()?.nativeElement : undefined;
    this.menuOpen.set(false);
    this.detailDialog()?.open(HOME_DETAILS[key], returnTarget);
  }

  protected focusSection(sectionId: string): void {
    this.menuOpen.set(false);
    this.document.getElementById(sectionId)?.focus({ preventScroll: true });
  }
}
