# Luma

Mobile-first Angular landing page based on the supplied desktop/mobile SVG and Figma reference. All interface copy, validation messages and accessible names are in English.

## Run locally

Validated with Node.js 24.21.0. Use the committed npm lockfile.

```sh
npm ci
npm start
```

Open http://localhost:4200. If your local Node version manager has no active version, select your installed Node version first (for example, `nvm use 24.21.0`).

Keep the development server running while reviewing the page: below-the-fold images are fetched as you scroll. If the server was stopped, restart it and reload the page to retry failed image requests. When serving with `--host 127.0.0.1`, use http://127.0.0.1:4200.

To test on a phone connected to the same local network, run `npm run start:lan` and open `http://<computer-local-ip>:4200` on the phone. The `lan` configuration in `angular.json` binds to `0.0.0.0` and explicitly allows this computer's current local addresses. If the router changes the computer's IP, update `allowedHosts` in that configuration and restart the server.

## Verification

```sh
npm run build
npm test -- --watch=false
npm run lint:styles
npm run format:check
```

`npm run format` applies the project's Prettier configuration. Stylelint enforces BEM class syntax, rejects ID selectors, and checks invalid colors, empty blocks and duplicate declarations. TypeScript strict mode and Angular strict template checking run with the build.

## Project structure

```text
src/
  app/
    app.ts                           # Minimal application entry component
    features/
      home/
        home-page.{ts,html,scss}      # Page composition and navigation
        home-page.spec.ts
        home-content.ts              # Typed detail content and action targets
        home-data.ts                 # Editable static business values
        intro-section/
        learning-section/
        community-section/
        contact-section/             # Reactive form and its tests
        detail-dialog/               # Modal, focus management and its tests
        join-section/
  styles/
    _fonts.scss                      # Local variable WOFF2 font
    _tokens.scss                     # Shared CSS custom properties
    _breakpoints.scss                # Named Sass breakpoint values
    _base.scss                       # Reset and document defaults
    _typography.scss
    _elements.scss                   # Shared visual blocks
    _utilities.scss                  # Layout utilities, prefixed u-
    _accessibility.scss              # Focus, skip link, reduced motion
  styles.scss                        # Ordered Sass @use entry point
```

Component TypeScript, HTML, SCSS and tests are co-located. Files use kebab-case and exported component classes use PascalCase, following the current [Angular style guide](https://angular.dev/style-guide). Components remain inside the home feature until there is a real reuse case; there are no empty service layers or global state libraries.

## SCSS conventions

Use BEM: `.intro` is a block, `.intro__image` is an element, and `.button--primary` is a modifier. Always apply a modifier together with its base class, such as `class="button button--primary"`. Layout-only utilities use `u-`, for example `.u-container`. Positional collage modifiers such as `.community__photo--position-1` intentionally describe a position in the supplied composition.

Keep component rules in the matching SCSS file, shared visual blocks in `_elements.scss`, colors in `_tokens.scss`, and media-query thresholds in `_breakpoints.scss`. Use `@use`, avoid styling by IDs, and prefer shallow selectors. Stylelint checks class syntax; review is still needed to judge whether the chosen block names and responsibilities make sense.

## Responsive behavior

Styles start at mobile sizes. Category cards become two columns at 600px and four columns at 900px. At 768px the spacing and typography expand; at 900px the header and section layouts switch to desktop. The main container is capped at 1120px, matching the 1280px design with 80px margins. The intro photograph comes first on mobile and moves alongside the copy on desktop.

## Accessibility

- Native landmarks, a single `h1`, section headings, labels and informative image alternatives.
- A visible-on-focus skip link with a programmatically focusable main target.
- Mobile navigation is a disclosure, not an application-style ARIA menu. Its controlled element remains in the DOM, is hidden when closed, and exposes `aria-expanded`. Clicking outside dismisses it without stealing focus from the clicked control. Escape returns focus to the toggle; selecting a section moves focus to that section.
- Native `<dialog>` supplies modal behavior. Content renders before `showModal()`. The close button receives initial focus, Tab boundaries wrap, Escape closes, and closing restores the relevant trigger or destination. A hidden mobile menu never becomes the return target.
- Reactive form validation associates English error text with each invalid field. After rendering the errors, submission focuses the first invalid field. Email validation requires a domain with a suffix. Questions have a 1,500-character limit enforced in HTML and Angular, with a visible counter. A valid demo submission opens an accessible confirmation dialog, clears the fields and resets validation state. The dialog explicitly distinguishes simulation from delivery and restores focus to Send message on close.
- Visible keyboard focus, higher-contrast form borders, and reduced-motion preferences are respected.

These changes follow [WAI dialog guidance](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) and [WAI form feedback guidance](https://www.w3.org/WAI/tutorials/forms/notifications/). The checks documented in [the technical walkthrough](docs/TECHNICAL_WALKTHROUGH.md) are evidence of specific behavior, not a complete WCAG conformance audit.

## Performance decisions

The initial page is prerendered and hydrated by Angular. The intro image has explicit dimensions and high fetch priority; below-the-fold photographs are lazy-loaded and their layout space is reserved. All assets are local, with no runtime font or photo CDN requests.

Three TTF font files totaling 977,336 bytes were replaced with one Latin variable WOFF2 file of 48,256 bytes (95.1% smaller font assets). This measures font files, not total page weight or load-time improvement. The original 17 photographs are preserved; responsive image derivatives remain a possible improvement.

## Front-end boundaries

Navigation, category/course dialogs and form validation work locally. Contact submission is a clearly labeled simulation: no message is sent or saved. The confirmation describes the live-service response target of 24 business hours. A future backend integration must wait for actual success before showing confirmation and clearing the form. There is no server-side delivery, persistence, authentication, enrollment or full course catalog. The email link remains available separately.

## Editable business data

Edit `src/app/features/home/home-data.ts` to change the rating, learner/course counts, completion percentage, featured course, testimonial, contact email, response hours, question limit and copyright year. Intro and statistics share the same counts; course details and their dialog share the same data. Stars reflect the rating on a five-point scale, including partial fills, with an accessible numeric label. Values are static for this preview and can later come from a service. The testimonial and statistics come from the supplied design; verify production content before launch.

The 17 photographs in `public/images` were extracted unchanged from the supplied SVG. Inter is served locally under `public/fonts/OFL.txt`.

For the review criteria, demonstrable decisions and interview preparation, see [Technical walkthrough](docs/TECHNICAL_WALKTHROUGH.md).
