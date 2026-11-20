'use client';

import { useEffect, useRef, useState } from 'react';
import { IntroSection } from './intro-section';
import { LearningSection } from './learning-section';
import { CommunitySection } from './community-section';
import { ContactSection } from './contact-section';
import { JoinSection } from './join-section';
import { DetailDialog } from './detail-dialog';
import { HOME_DETAILS, type HomeDetailKey, type HomeDetail } from './home-content';
import type { HomeData } from './home-data';

const navigation = [
  { label: 'Courses', id: 'courses' },
  { label: 'For Teams', id: 'contact' },
  { label: 'Community', id: 'community' },
  { label: 'About', id: 'how-it-works' },
];
const footerGroups: {
  title: string;
  links: { label: string; section?: string; detail?: HomeDetailKey }[];
}[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Courses', section: 'courses' },
      { label: 'Categories', section: 'courses' },
      { label: 'Instructors', section: 'community' },
      { label: 'For Teams', section: 'contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', section: 'how-it-works' },
      { label: 'Careers', detail: 'careers' },
      { label: 'Journal', detail: 'journal' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', section: 'contact' },
      { label: 'Contact', section: 'contact' },
      { label: 'Terms', detail: 'terms' },
      { label: 'Privacy', detail: 'privacy' },
    ],
  },
];

export function HomePage({ data }: { data: HomeData }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [detail, setDetail] = useState<HomeDetail | null>(null);
  const menu = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const returnTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function onClick(event: MouseEvent) {
      const target = event.target as Node;
      if (menu.current?.contains(target) || toggle.current?.contains(target)) return;
      if (menu.current?.contains(document.activeElement))
        toggle.current?.focus({ preventScroll: true });
      setMenuOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggle.current?.focus();
      }
    }
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  function openDetail(key: HomeDetailKey, trigger: HTMLElement) {
    returnTarget.current = menuOpen ? toggle.current : trigger;
    setMenuOpen(false);
    setDetail(HOME_DETAILS[key]);
  }
  function closeDetail(section?: string) {
    const target = section ? document.getElementById(section) : returnTarget.current;
    setDetail(null);
    requestAnimationFrame(() => {
      if (target?.isConnected) target.focus({ preventScroll: true });
    });
  }
  function navigate(section: string) {
    setMenuOpen(false);
    document.getElementById(section)?.focus({ preventScroll: true });
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header" id="top">
        <div className="u-container site-header__inner">
          <a className="brand-logo" href="#top" aria-label="Luma home">
            luma.
          </a>
          <nav className="site-header__nav" aria-label="Main navigation">
            {navigation.map((link) => (
              <a key={link.id} href={`#${link.id}`}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="site-header__actions">
            <button
              className="site-header__login"
              onClick={(event) => openDetail('login', event.currentTarget)}
            >
              Log in
            </button>
            <a className="button button--primary" href="#courses">
              Start learning
            </a>
          </div>
          <button
            ref={toggle}
            className="site-header__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d={menuOpen ? 'm6 6 12 12M6 18 18 6' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>
        <nav
          ref={menu}
          id="mobile-menu"
          className="site-header__mobile-nav"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {navigation.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => navigate(link.id)}>
              {link.label}
            </a>
          ))}
          <button onClick={(event) => openDetail('login', event.currentTarget)}>Log in</button>
          <a href="#courses" className="button button--primary" onClick={() => navigate('courses')}>
            Start learning
          </a>
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <IntroSection metrics={data} />
        <LearningSection course={data.featuredCourse} onExplore={openDetail} />
        <CommunitySection metrics={data} testimonial={data.testimonial} />
        <ContactSection
          contact={data.contact}
          onSubmitted={(trigger) => openDetail('contactConfirmation', trigger)}
        />
        <JoinSection />
      </main>
      <footer className="site-footer">
        <div className="u-container">
          <div className="site-footer__grid">
            <div className="site-footer__brand">
              <a className="brand-logo" href="#top" aria-label="Luma home">
                luma.
              </a>
              <p className="site-footer__description">Practical learning for curious people.</p>
            </div>
            {footerGroups.map((group) => (
              <nav className="site-footer__nav" aria-label={group.title} key={group.title}>
                <h2 className="site-footer__heading">{group.title}</h2>
                {group.links.map((link) =>
                  link.section ? (
                    <a className="site-footer__link" href={`#${link.section}`} key={link.label}>
                      {link.label}
                    </a>
                  ) : (
                    <button
                      className="site-footer__link"
                      key={link.label}
                      onClick={(event) => openDetail(link.detail!, event.currentTarget)}
                    >
                      {link.label}
                    </button>
                  ),
                )}
              </nav>
            ))}
          </div>
          <p className="site-footer__copyright">© {data.copyrightYear} Luma Learning</p>
        </div>
      </footer>
      <DetailDialog detail={detail} onClose={closeDetail} />
    </>
  );
}
