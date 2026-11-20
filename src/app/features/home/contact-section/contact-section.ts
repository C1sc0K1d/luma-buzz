import { afterNextRender, Component, inject, Injector, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HOME_DATA } from '../home-data';

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
})
export class ContactSection {
  readonly messageSubmitted = output<HTMLButtonElement>();
  protected readonly contact = HOME_DATA.contact;
  private readonly injector = inject(Injector);
  protected readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
        Validators.maxLength(254),
      ],
    }),
    question: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/\S/),
        Validators.maxLength(this.contact.questionMaxLength),
      ],
    }),
  });
  protected readonly attempted = signal(false);

  protected invalid(field: 'name' | 'email' | 'question'): boolean {
    const control = this.form.controls[field];
    return control.invalid && (control.touched || this.attempted());
  }

  protected submitMessage(formElement: HTMLFormElement, submitButton: HTMLButtonElement): void {
    this.attempted.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid && formElement) {
      const fields = ['name', 'email', 'question'] as const;
      const firstInvalid = fields.find((field) => this.form.controls[field].invalid);
      const input = firstInvalid ? formElement.elements.namedItem(firstInvalid) : null;
      afterNextRender(
        () => {
          if (input && 'focus' in input) (input as HTMLElement).focus();
        },
        { injector: this.injector },
      );
      return;
    }
    // Front-end demo only. A real integration must reset only after API success.
    this.messageSubmitted.emit(submitButton);
    this.form.reset();
    this.attempted.set(false);
  }
}
