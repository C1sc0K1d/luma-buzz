export interface LearningMetrics {
  rating: number;
  expertLedCourses: number;
  learners: number;
  completionPercent: number;
}

export interface FeaturedCourse {
  title: string;
  description: string;
  instructor: string;
  instructorRole: string;
  lessons: number;
  durationMinutes: number;
  level: string;
}

export interface LearnerTestimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

export interface HomeData extends LearningMetrics {
  copyrightYear: number;
  contact: {
    email: string;
    responseBusinessHours: number;
    questionMaxLength: number;
  };
  featuredCourse: FeaturedCourse;
  testimonial: LearnerTestimonial;
}

/** Static preview data. Change business values here, rather than in templates. */
export const HOME_DATA: HomeData = {
  rating: 4.9,
  expertLedCourses: 120,
  learners: 24000,
  completionPercent: 92,
  copyrightYear: 2026,
  contact: {
    email: 'contact@luma.com',
    responseBusinessHours: 24,
    questionMaxLength: 1500,
  },
  featuredCourse: {
    title: 'Designing products people understand.',
    description:
      'Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.',
    instructor: 'Maya Chen',
    instructorRole: 'Senior Product Designer',
    lessons: 8,
    durationMinutes: 160,
    level: 'Intermediate',
  },
  testimonial: {
    quote:
      'The lessons are short enough to fit into my week, but detailed enough that I actually leave with something I can use.',
    name: 'Alex Morgan',
    role: 'Product Manager',
    image: '/images/alex.jpg',
  },
};

export function ratingPresentation(value: number) {
  const score = Number.isFinite(value) ? Math.round(Math.min(5, Math.max(0, value)) * 10) / 10 : 0;
  return {
    score,
    fills: Array.from({ length: 5 }, (_, index) => Math.min(1, Math.max(0, score - index)) * 100),
  };
}

export function formatCount(value: number, compact = false): string {
  return new Intl.NumberFormat('en-US', {
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value);
}

export function courseFacts(course: FeaturedCourse = HOME_DATA.featuredCourse): string[] {
  const hours = Math.floor(course.durationMinutes / 60);
  const minutes = course.durationMinutes % 60;
  const duration = [hours ? `${hours}h` : '', minutes ? `${minutes}min` : '']
    .filter(Boolean)
    .join(' ');
  return [
    `${course.lessons} ${course.lessons === 1 ? 'lesson' : 'lessons'}`,
    duration || '0min',
    course.level,
  ];
}
