import { HOME_DATA, courseFacts } from './home-data';

export interface HomeDetail {
  title: string;
  eyebrow: string;
  description: string;
  facts?: readonly string[];
  primaryAction?: { label: string; sectionId: string };
  confirmation?: boolean;
}

export const HOME_DETAILS = {
  featured: {
    eyebrow: 'Featured course',
    title: HOME_DATA.featuredCourse.title,
    description: `${HOME_DATA.featuredCourse.description} Taught by ${HOME_DATA.featuredCourse.instructor}, ${HOME_DATA.featuredCourse.instructorRole}.`,
    facts: courseFacts(),
  },
  'Product Design': {
    eyebrow: 'Find your next skill',
    title: 'Product Design',
    primaryAction: { label: 'View featured course', sectionId: 'featured-course' },
    description: `Turn complex problems into clear, useful experiences. Discover our featured course, ${HOME_DATA.featuredCourse.title} Get in touch to find the right place to start.`,
  },
  Technology: {
    eyebrow: 'Find your next skill',
    title: 'Technology',
    description:
      'Build a stronger understanding of the tools shaping digital products. Tell us what you want to learn and we’ll help you find your next course.',
  },
  Business: {
    eyebrow: 'Find your next skill',
    title: 'Business',
    description:
      'Develop practical skills for better decisions and stronger teams. Get in touch to explore learning for you or your team.',
  },
  Creative: {
    eyebrow: 'Find your next skill',
    title: 'Creative',
    description:
      'Explore new ways to communicate, create and tell stories. Tell us about your creative goals to find your next step.',
  },
  login: {
    eyebrow: 'Your learning journey',
    title: 'Welcome back to Luma.',
    description:
      'The learner sign-in experience is not available yet. Contact us for help with access or to hear more about learning with Luma.',
  },
  careers: {
    eyebrow: 'Grow with us',
    title: 'Make room for your next chapter.',
    description:
      'Interested in joining Luma or sharing what you know? Get in touch and tell us about your experience.',
  },
  journal: {
    eyebrow: 'The Luma journal',
    title: 'Stay curious.',
    description:
      'Our journal is coming soon. In the meantime, explore how Luma works and find a skill you’d love to build.',
  },
  terms: {
    eyebrow: 'Terms',
    title: 'Learning with Luma',
    description:
      'Enrollment and learner accounts are not available on this preview. Terms of service will be provided before enrollment opens. Contact us if you have questions.',
  },
  privacy: {
    eyebrow: 'Privacy',
    title: 'Your information stays with you.',
    description:
      'This preview does not save your contact form or send it to a server. Submitting valid details demonstrates a confirmation dialog and clears the form. No message is delivered.',
  },
  contactConfirmation: {
    eyebrow: 'Demo confirmation',
    title: 'Message sent',
    description: `Thank you for getting in touch. In the live service, our team will contact you within ${HOME_DATA.contact.responseBusinessHours} business hours. This preview simulates sending; no message has been delivered.`,
    confirmation: true,
  },
} as const satisfies Record<string, HomeDetail>;

export type HomeDetailKey = keyof typeof HOME_DETAILS;
