import Image from 'next/image';
export function JoinSection() {
  return (
    <section className="u-section join-banner" aria-labelledby="join-title">
      <div className="join-banner__artwork" aria-hidden="true">
        <span className="join-banner__shape join-banner__shape--circle"></span>
        <span className="join-banner__shape join-banner__shape--square"></span>
        <span className="join-banner__shape join-banner__shape--corner"></span>
        <span className="join-banner__shape join-banner__shape--dot"></span>
        <span className="join-banner__shape join-banner__shape--ball"></span>
        <span className="join-banner__shape join-banner__shape--ring"></span>
        <svg
          className="join-banner__shape join-banner__shape--cube"
          viewBox="0 0 60 60"
          fill="none"
        >
          <path d="m30 2 27 16v26L30 59 3 44V18L30 2Zm0 0v57M3 18l54 26M57 18 3 44M3 18l27 16 27-16" />
        </svg>
        <span className="join-banner__shape join-banner__shape--small-ring"></span>
      </div>
      <div className="u-container join-banner__inner">
        <div className="avatar-stack" aria-hidden="true">
          {[1, 2, 3, 4].map((n) => (
            <Image key={n} src={`/images/avatar-${n}.jpg`} alt="" width={40} height={40} />
          ))}
        </div>
        <h2 id="join-title">What will you learn next?</h2>
        <p>Start with one course. Build from there.</p>
        <div className="u-actions">
          <a className="button button--primary" href="#courses">
            Explore all courses
          </a>
          <a className="button button--secondary" href="#contact">
            Join Luma
          </a>
        </div>
      </div>
    </section>
  );
}
