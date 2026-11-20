export interface ContactValues {
  name: string;
  email: string;
  question: string;
}
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export function validateContact(values: ContactValues, maxQuestionLength: number): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim() || values.name.length > 100)
    errors.name = 'Please enter your name (up to 100 characters).';
  const [local, domain] = values.email.split('@');
  if (
    values.email.length > 254 ||
    !local ||
    local.length > 64 ||
    !domain ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ||
    values.email.includes('..') ||
    local.startsWith('.') ||
    local.endsWith('.') ||
    !domain.split('.').every((label) => /^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(label))
  )
    errors.email = 'Please enter a valid email address.';
  if (!values.question.trim()) errors.question = 'Please tell us how we can help.';
  else if (values.question.length > maxQuestionLength)
    errors.question = `Please use no more than ${maxQuestionLength} characters.`;
  return errors;
}
