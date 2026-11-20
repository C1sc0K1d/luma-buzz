# Technical walkthrough

## Structure

The App Router entry points are `src/app/layout.tsx` and `src/app/page.tsx`. The layout owns metadata and the local Inter font. The page supplies typed mock data to the home feature.

`src/features/home` contains the intro, courses, community, contact form, shared dialog and final call to action. The home component coordinates menu and dialog state. Inputs are typed with interfaces; there is no global state library or backend.

Tailwind is configured through `@tailwindcss/postcss`. Theme tokens and BEM component classes live in `src/app/globals.css`, using `@apply` for shared layout and appearance. Custom CSS preserves the supplied collage, decorative shapes and precise responsive spacing.

## Decisions beyond the reference

- Tablet layouts interpolate between the mobile and desktop designs, with breakpoints at 600, 768 and 900px.
- English replaces the mixed-language form labels and placeholder community copy.
- Contact submission is a local simulation. It validates before resetting and never claims actual delivery.
- The mobile navigation is a disclosure, not an ARIA application menu. Clicking outside or pressing Escape dismisses it.
- A native dialog handles course details and contact confirmation. Its name, description, focus boundaries and return target are explicit.
- The original 17 photographs remain local. Next's image component generates optimized responsive responses; source images are unchanged.

## Verification

Checked on November 20, 2026, on Windows with Node.js 24.21.0.

| Check                                               | Result                                         |
| --------------------------------------------------- | ---------------------------------------------- |
| `npm ci`                                            | Passed; ESLint deprecation warning noted below |
| `npm run build`                                     | Passed; the home page is prerendered           |
| `npm run typecheck`                                 | Passed                                         |
| `npm run lint`                                      | Passed                                         |
| `npm test`                                          | 16 tests passed                                |
| `npm run test:e2e` with `PLAYWRIGHT_CHANNEL=msedge` | 14 passed, 1 intentionally skipped             |
| `npm run format:check`                              | Passed                                         |
| `git diff --check`                                  | Passed                                         |

Playwright ran against the production server in headless Microsoft Edge at 375 × 812, 768 × 1024 and 1280 × 900. The skipped case is the mobile-menu test on desktop, where navigation is inline.

The browser checks cover section visibility, successful image loading, horizontal overflow, JavaScript page errors, outside-click dismissal, Escape, dialog focus containment and restoration, required fields, invalid email, the 1,500-character limit, mock confirmation and form reset. They also exercise the skip link and reduced-motion setting. Unit tests cover the rating-to-stars calculation, number formatting and contact validation boundaries.

Desktop and mobile screenshots were visually reviewed, including the intro and community collage. The mobile title spacing and skip-link visibility were corrected during that review. Screenshots and failure traces are generated in the ignored `test-results` directory; there is no automated pixel comparison with Figma.

No checks in the table are currently failing. ESLint 9 emits an installation warning because it is out of support. It remains in use because the React, import and accessibility plugins bundled with this Next.js version do not yet declare ESLint 10 compatibility. This is a tooling maintenance gap, not a suppressed lint failure.

Mobile and tablet coverage uses browser emulation, not physical devices. Screen-reader testing, Safari/Firefox coverage and Lighthouse profiling are not complete. The contact form and account-related dialogs remain local demonstrations; there is no backend or real message delivery.

## Sources

- [Next.js App Router installation](https://nextjs.org/docs/app/getting-started/installation)
- [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
