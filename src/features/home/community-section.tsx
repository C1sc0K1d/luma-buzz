import Image from 'next/image';
import { type LearningMetrics, type LearnerTestimonial, formatCount } from './home-data';
const photos = [
  { file: 1, alt: 'A student taking part in an online class' },
  { file: 2, alt: 'Students working together around a laptop' },
  { file: 3, alt: 'A student studying in the library' },
  { file: 4, alt: 'A music teacher helping a student practise singing' },
  { file: 5, alt: 'A learner writing notes at his desk' },
  { file: 6, alt: 'A graduate celebrating an achievement' },
  { file: 7, alt: 'A student learning from home' },
  { file: 8, alt: 'An instructor teaching an online lesson' },
  { file: 9, alt: 'A student carrying books on campus' },
  { file: 10, alt: 'A woman carrying books and a cup of coffee' },
];
export function CommunitySection({
  metrics,
  testimonial,
}: {
  metrics: LearningMetrics;
  testimonial: LearnerTestimonial;
}) {
  return (
    <>
      <section className="u-section learner-results" aria-label="Learner experience and results">
        <div className="u-container learner-results__layout">
          <figure className="testimonial">
            <svg
              className="testimonial__mark"
              width="24"
              height="22"
              viewBox="0 0 24 22"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M23.7109 4.375C23.7109 5.41667 23.3724 7.42188 22.6953 10.3906C22.0182 13.3594 21.263 17.2135 20.4297 21.9531H18.0078C17.4089 18.099 16.7318 14.4271 15.9766 10.9375C15.2474 7.44792 14.8828 5.26042 14.8828 4.375C14.8828 3.17708 15.2474 2.14844 15.9766 1.28906C16.7057 0.429688 17.8125 0 19.2969 0C20.7292 0 21.8229 0.429688 22.5781 1.28906C23.3333 2.14844 23.7109 3.17708 23.7109 4.375ZM8.78906 4.375C8.78906 5.41667 8.45052 7.42188 7.77344 10.3906C7.09635 13.3594 6.34115 17.2135 5.50781 21.9531H3.125C2.42188 17.526 1.71875 13.75 1.01562 10.625C0.338542 7.47396 0 5.39062 0 4.375C0 3.17708 0.364583 2.14844 1.09375 1.28906C1.82292 0.429688 2.92969 0 4.41406 0C5.82031 0 6.90104 0.429688 7.65625 1.28906C8.41146 2.14844 8.78906 3.17708 8.78906 4.375Z"
                fill="#3157F6"
              />
            </svg>
            <blockquote className="testimonial__quote">{testimonial.quote}</blockquote>
            <figcaption className="testimonial__author">
              <Image src={testimonial.image} alt="" width="48" height="48" loading="lazy" />
              <div>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </div>
            </figcaption>
          </figure>
          <dl className="learning-stats">
            <div>
              <dt>{formatCount(metrics.learners, true)}+</dt>
              <dd>active learners</dd>
            </div>
            <div>
              <dt>{formatCount(metrics.expertLedCourses)}+</dt>
              <dd>expert-led courses</dd>
            </div>
            <div>
              <dt>{metrics.completionPercent}%</dt>
              <dd>complete their first course</dd>
            </div>
          </dl>
        </div>
      </section>
      <section
        className="u-section community"
        id="community"
        tabIndex={-1}
        aria-labelledby="people-title"
      >
        <div className="u-container community__layout">
          <div className="community__copy">
            <p className="eyebrow">The people</p>
            <h2 id="people-title">Meet international students &amp; teachers</h2>
            <p className="community__description">
              Different backgrounds. Shared curiosity. Meet the people who make learning at Luma
              feel human. Discover fresh perspectives, learn from real experience and find
              inspiration in a community of students and teachers moving forward together.
            </p>
            <a className="button button--secondary" href="#contact">
              Explore teachers and students
            </a>
          </div>
          <div className="community__collage" aria-label="Our international learning community">
            {photos.map((photo) => (
              <Image
                key={photo.file}
                className={`community__photo community__photo--position-${photo.file}`}
                src={`/images/community-${photo.file}.jpg`}
                alt={photo.alt}
                loading="lazy"
                width={188}
                height={250}
                sizes="(min-width: 900px) 140px, 25vw"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
