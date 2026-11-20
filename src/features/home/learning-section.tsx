import Image from 'next/image';
import { type FeaturedCourse, courseFacts } from './home-data';
import type { HomeDetailKey } from './home-content';
const categories: { name: HomeDetailKey; description: string }[] = [
  {
    name: 'Product Design',
    description: 'Turn complex problems into clear, useful experiences.',
  },
  {
    name: 'Technology',
    description: 'Build a stronger understanding of the tools shaping digital products.',
  },
  {
    name: 'Business',
    description: 'Develop practical skills for better decisions and stronger teams.',
  },
  { name: 'Creative', description: 'Explore new ways to communicate, create and tell stories.' },
];
const steps = [
  {
    title: 'Choose your focus',
    description:
      'Find courses based on the skill you want to build, not endless content categories.',
  },
  {
    title: 'Learn from experience',
    description: 'Follow concise lessons created by professionals who actually use these skills.',
  },
  {
    title: 'Put it into practice',
    description:
      'Every course includes practical exercises designed to turn knowledge into action.',
  },
];
export function LearningSection({
  course,
  onExplore,
}: {
  course: FeaturedCourse;
  onExplore: (key: HomeDetailKey, trigger: HTMLButtonElement) => void;
}) {
  const facts = courseFacts(course);
  return (
    <>
      <section
        className="u-section course-categories"
        id="courses"
        tabIndex={-1}
        aria-labelledby="courses-title"
      >
        <div className="u-container">
          <div className="course-categories__intro">
            <p className="eyebrow">Find your next skill</p>
            <h2 id="courses-title">Learn something worth knowing.</h2>
            <p>Short, practical courses designed around skills you can put to work immediately.</p>
          </div>
          <div className="course-categories__grid">
            {categories.map((category, i) => (
              <article key={category.name} className="course-card">
                <span className="course-card__number">0{i + 1}</span>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <button
                  className="course-card__link"
                  onClick={(event) => onExplore(category.name, event.currentTarget)}
                  aria-label={`Explore ${category.name}`}
                >
                  Explore{' '}
                  <span className="arrow-icon" aria-hidden="true">
                    →
                  </span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="u-section featured-course"
        id="featured-course"
        tabIndex={-1}
        aria-labelledby="featured-title"
      >
        <div className="u-container featured-course__layout">
          <div className="featured-course__visual">
            <Image
              src="/images/featured.jpg"
              width="700"
              height="500"
              sizes="(min-width: 1280px) 530px, (min-width: 900px) 42vw, calc(100vw - 40px)"
              alt="A product designer experimenting with materials and prototypes at a workbench"
              loading="lazy"
            />
            <span>Featured course</span>
          </div>
          <div className="featured-course__copy">
            <p className="eyebrow">Most popular this month</p>
            <h2 id="featured-title">{course.title}</h2>
            <p className="featured-course__description">{course.description}</p>
            <p className="featured-course__instructor">
              with {course.instructor} · {course.instructorRole}
            </p>
            <ul className="featured-course__facts" aria-label="Course details">
              {facts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
            <div className="u-actions">
              <button
                className="button button--yellow"
                onClick={(event) => onExplore('featured', event.currentTarget)}
              >
                View course
              </button>
              <a className="button button--ghost" href="#courses">
                Browse all courses{' '}
                <span className="arrow-icon" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section
        className="u-section learning-steps"
        id="how-it-works"
        tabIndex={-1}
        aria-labelledby="how-title"
      >
        <div className="u-container">
          <div className="learning-steps__heading">
            <p className="eyebrow">How Luma works</p>
            <h2 id="how-title">Less browsing. More learning.</h2>
          </div>
          <ol className="learning-steps__list">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span
                  className={`learning-steps__shape ${i === 1 ? 'learning-steps__shape--experience' : i === 2 ? 'learning-steps__shape--practice' : ''}`}
                  aria-hidden="true"
                ></span>
                <p className="learning-steps__number">Step 0{i + 1}</p>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
