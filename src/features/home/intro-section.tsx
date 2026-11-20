import Image from 'next/image';
import { type LearningMetrics, formatCount, ratingPresentation } from './home-data';
export function IntroSection({ metrics }: { metrics: LearningMetrics }) {
  const rating = ratingPresentation(metrics.rating);
  return (
    <section className="intro" aria-labelledby="intro-title">
      <div className="u-container intro__layout">
        <div className="intro__visual">
          <div className="intro__accent" aria-hidden="true"></div>
          <div className="intro__circle" aria-hidden="true"></div>
          <Image
            className="intro__image"
            src="/images/intro.jpg"
            width="900"
            height="1100"
            sizes="(min-width: 1280px) 500px, (min-width: 900px) 42vw, (min-width: 600px) 400px, calc(100vw - 40px)"
            alt="A smiling learner with glasses working at her laptop"
            preload
          />
          <div className="intro__course-badge">
            <strong>{formatCount(metrics.expertLedCourses)}+</strong>
            <span>expert-led courses</span>
          </div>
          <div
            className="intro__rating-badge"
            role="img"
            aria-label={`${rating.score} out of 5 average rating`}
          >
            <span className="intro__stars" aria-hidden="true">
              {rating.fills.map((fill, index) => (
                <span className="intro__star" key={index}>
                  ☆
                  <span className="intro__star-fill" style={{ width: `${fill}%` }}>
                    ★
                  </span>
                </span>
              ))}
            </span>
            <span aria-hidden="true">{rating.score} avg rating</span>
          </div>
        </div>
        <div className="intro__copy">
          <p className="eyebrow">Learn at your own pace</p>
          <h1 id="intro-title">
            Build skills that <br className="intro__line-break" />
            actually move you forward.
          </h1>
          <p className="intro__description">
            Practical courses taught by people who do the work every day. Learn design, technology,
            business and more — one focused lesson at a time.
          </p>
          <div className="u-actions">
            <a className="button button--primary" href="#courses">
              Explore courses
            </a>
            <a className="button button--secondary" href="#how-it-works">
              See how it works
            </a>
          </div>
          <div className="intro__trust">
            <div className="avatar-stack" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <Image key={n} src={`/images/avatar-${n}.jpg`} alt="" width={32} height={32} />
              ))}
            </div>
            <p>
              <strong>Trusted by {formatCount(metrics.learners)}+</strong> learners
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
