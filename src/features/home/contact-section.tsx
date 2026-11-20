import { useRef, useState, type FormEvent } from 'react';
import type { HomeData } from './home-data';
import { validateContact, type ContactValues } from './contact-validation';

const emptyValues: ContactValues = { name: '', email: '', question: '' };
interface ContactSectionProps {
  contact: HomeData['contact'];
  onSubmitted: (trigger: HTMLButtonElement) => void;
}

export function ContactSection({ contact, onSubmitted }: ContactSectionProps) {
  const [values, setValues] = useState<ContactValues>(emptyValues);
  const [touched, setTouched] = useState<Partial<Record<keyof ContactValues, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const submitButton = useRef<HTMLButtonElement>(null);
  const errors = validateContact(values, contact.questionMaxLength);
  const errorFor = (field: keyof ContactValues) =>
    touched[field] || attempted ? errors[field] : undefined;
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    const firstInvalid = (['name', 'email', 'question'] as const).find((field) => errors[field]);
    if (firstInvalid) {
      const form = event.currentTarget;
      requestAnimationFrame(() =>
        (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus(),
      );
      return;
    }
    // Mock success only. A real service must return success before the form resets.
    onSubmitted(submitButton.current!);
    setValues(emptyValues);
    setTouched({});
    setAttempted(false);
  }
  function fieldProps(field: keyof ContactValues) {
    return {
      name: field,
      value: values[field],
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setValues((previous) => ({ ...previous, [field]: event.target.value })),
      onBlur: () => setTouched((previous) => ({ ...previous, [field]: true })),
      'aria-invalid': !!errorFor(field),
    };
  }
  return (
    <section
      className="u-section contact"
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
    >
      <div className="u-container contact__layout">
        <div className="contact__copy">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title">Get in touch</h2>
          <p className="contact__description">
            Have a question? We’re here to help. Whether you’re looking for the right course,
            learning with your team or interested in teaching with Luma, we’d love to hear from you.
          </p>
          <div className="contact__details">
            <a className="contact__item" href={`mailto:${contact.email}`}>
              <span className="contact__icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 11.5a9 9 0 0 1-9 9 10 10 0 0 1-4-.9L3 21l1.4-4.9a9 9 0 1 1 16.6-4.6Z" />
                  <path d="M8 11h.01M12 11h.01M16 11h.01" strokeLinecap="round" strokeWidth="2.5" />
                </svg>
              </span>
              <span>
                <span className="contact__label">Email</span>
                <span className="contact__email">{contact.email}</span>
              </span>
            </a>
            <div className="contact__item">
              <span className="contact__icon">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="8.5" />
                  <path d="M12 7v5l3 2" strokeLinecap="round" />
                </svg>
              </span>
              <span>
                <span className="contact__label">Response Time</span>
                <span className="contact__value">
                  Up to {contact.responseBusinessHours} hours on business days
                </span>
              </span>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit} noValidate aria-labelledby="form-title">
          <h3 id="form-title">Contact us</h3>
          <p className="contact-form__intro">Fill out the fields and we will get in touch.</p>
          <div className="contact-form__field">
            <label className="contact-form__label" htmlFor="full-name">
              Full name
            </label>
            <input
              {...fieldProps('name')}
              className="contact-form__input"
              id="full-name"
              autoComplete="name"
              placeholder="Your name"
              maxLength={100}
              required
              aria-describedby={errorFor('name') ? 'name-error' : undefined}
            />
            {errorFor('name') && (
              <p className="contact-form__error" id="name-error">
                {errors.name}
              </p>
            )}
          </div>
          <div className="contact-form__field">
            <label className="contact-form__label" htmlFor="email">
              Email
            </label>
            <input
              {...fieldProps('email')}
              className="contact-form__input"
              id="email"
              type="email"
              autoComplete="email"
              placeholder="youremail@example.com"
              maxLength={254}
              required
              aria-describedby={errorFor('email') ? 'email-error' : undefined}
            />
            {errorFor('email') && (
              <p className="contact-form__error" id="email-error">
                {errors.email}
              </p>
            )}
          </div>
          <div className="contact-form__field">
            <label className="contact-form__label" htmlFor="question">
              Your question
            </label>
            <textarea
              {...fieldProps('question')}
              className="contact-form__input contact-form__input--multiline"
              id="question"
              placeholder="Tell us how we can help..."
              rows={4}
              maxLength={contact.questionMaxLength}
              required
              aria-describedby={
                errorFor('question') ? 'question-hint question-error' : 'question-hint'
              }
            />
            <p className="contact-form__hint" id="question-hint">
              {values.question.length} / {contact.questionMaxLength} characters
            </p>
            {errorFor('question') && (
              <p className="contact-form__error" id="question-error">
                {errors.question}
              </p>
            )}
          </div>
          <button ref={submitButton} className="button button--primary" type="submit">
            Send message
          </button>
          {attempted && Object.keys(errors).length > 0 && (
            <p className="contact-form__error contact-form__status" role="alert">
              Please check the highlighted fields.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
