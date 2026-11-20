# Technical walkthrough

## Scope and review criteria

This is a front-end landing page implementation. Evaluation should distinguish implemented interactions from integrations that the design does not specify.

| Criterion            | Implementation and evidence                                                                                                       | Remaining limits                                                                                                                                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Design accuracy      | Original SVG photographs, color tokens, section order and mobile/desktop compositions; local font and original collage            | Visual inspection is not a pixel-difference test. The Latin placeholder paragraph was replaced with English at the user's request. Input borders and focus indicators deliberately prioritize visibility. |
| Responsiveness       | Mobile-first CSS, shared breakpoints, fluid containers and grids                                                                  | Browser checks cover representative widths; real-device and cross-browser testing remain useful.                                                                                                          |
| Code quality         | Feature-based folders, co-located templates/styles/tests, typed content, strict TypeScript/templates, BEM, Prettier and Stylelint | Stylelint enforces syntax, not the quality of every naming decision.                                                                                                                                      |
| Working interactions | Section navigation, mobile disclosure, detail dialogs, validation and simulated submission confirmation                           | No authentication, enrollment, catalog backend or email delivery service.                                                                                                                                 |
| Accessibility        | Semantic HTML, keyboard navigation, focus management, labels, field errors, image alternatives and reduced motion                 | No full assistive-technology or WCAG conformance audit has been performed.                                                                                                                                |
| Performance          | Prerendered HTML, local assets, prioritized intro, lazy photographs and smaller WOFF2 font                                        | No Lighthouse score or field Core Web Vitals measurement is claimed.                                                                                                                                      |

## A five-minute demo

1. Show the mobile layout, then resize to desktop. Explain the content order and why breakpoints follow layout needs.
2. Use the keyboard to reach the skip link. Open the mobile navigation, choose a section, and demonstrate Escape.
3. Open a course dialog. Demonstrate initial focus, forward/reverse Tab wrapping, Escape, and focus restoration. Open the mobile Log in dialog to show why focus returns to the menu toggle rather than its now-hidden child button.
4. Submit an empty form. Show that the first invalid field receives focus and references its error. Correct the values, submit, and demonstrate the confirmation dialog and cleared fields; explicitly explain that this is a simulation and no email has been sent.
5. Show the feature folders, a BEM example, the shared tokens, and the commands for build, tests, styles and formatting.

## Decisions to explain

### Why standalone Angular components?

The repository already used Angular. Keeping that stack avoids an unnecessary migration. Sections own their markup and styles; the home page composes them and coordinates navigation. Signals cover local UI state, outputs communicate category selection, and Reactive Forms handle validation. A global state store would add complexity without a shared-state requirement.

### Why this folder structure?

The unit of organization is the home feature. Closely related TypeScript, HTML, SCSS and tests live together. This follows the current Angular style guide's feature-oriented approach. The minimal root component bootstraps the page; the dialog has a separate component because focus handling and its tests form a distinct responsibility.

### Why BEM plus Angular style encapsulation?

Encapsulation reduces accidental CSS leakage. BEM makes ownership and variations readable to the next developer. These solve related but different maintenance problems. Shared blocks such as `button` remain global; component-specific elements such as `intro__image` remain local. The `u-` prefix identifies layout utilities. Sass `@use` imports shared breakpoints without emitting duplicate rules.

### Why a native dialog?

`showModal()` supplies the browser's modal semantics and makes the surrounding document inert. Angular first renders the accessible title and controls, then opens the modal using `afterNextRender`. Small explicit handlers cover initial focus, Tab boundaries, and returning focus after close. This avoids shipping a component library for a single dialog.

### What makes the form accessible?

Each control has a visible label and a stable ID. Invalid fields expose `aria-invalid` and reference specific English errors with `aria-describedby`. Submitting invalid data renders the feedback before moving focus to the first invalid field. Errors have an overall alert; the confirmation dialog explains that sending is simulated. A character counter and both HTML and Angular validation enforce the 1,500-character question limit. Visual error color is accompanied by text.

### What improved performance?

The font payload dropped from 977,336 to 48,256 bytes. The variable WOFF2 covers the English interface and uses local delivery, preload and `font-display: swap`. This does not prove a particular LCP or overall loading score. Intro priority and reserved image dimensions are further concrete choices, while image derivatives and production profiling are future improvements.

### What would change with a real API?

Keep server-side contact delivery behind a service with a typed contract. Add pending, success and failure states, prevent duplicate submissions, and announce feedback accessibly. Repeat validation on the server. Authentication and enrollment require actual flows and failure states; informational dialogs should not be presented as implemented account features.

## Verification log

Commands and browser checks should be rerun when behavior or layout changes. Unit tests exercise application behavior; they do not replace browser testing of native modal focus or screen-reader announcements.

- Build: production compilation with strict TypeScript and template checks and configured bundle budgets.
- Tests: root rendering, valid anchor destinations, menu visibility/Escape/section focus, dialog render timing/focus restoration/Tab boundaries, form validation/focus/error association, email and question-length boundaries, valid-submission reset, confirmation dialog, outside-click dismissal and rating-to-star consistency.
- Style checks: BEM syntax, ID selectors, duplicate properties, empty rules, invalid colors.
- Formatting: Prettier on the source and project documentation.
- Browser: keyboard dialog and form flows, mobile navigation, responsive overflow and visual review. See the final verification results below.

## Still to validate before claiming full accessibility or production performance

Run NVDA with a supported Windows browser or VoiceOver on Apple devices, including live form feedback. Check text zoom, forced colors and real-device touch behavior. Run an automated accessibility scan alongside manual checks, then profile the production build with Lighthouse and real network conditions. Do not substitute a good automated score for assistive-technology testing.

## References

- [Angular style guide](https://angular.dev/style-guide)
- [BEM naming](https://getbem.com/naming/)
- [WAI modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [WAI form notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [Angular afterNextRender](https://angular.dev/api/core/afterNextRender)

## Earlier browser verification — 2026-11-20

- Production build passed without warnings; one route prerendered. Initial JavaScript and CSS total: 355.90 kB raw, 93.92 kB estimated transfer, excluding fonts and images.
- All 10 tests passed across 4 test files.
- Stylelint and Prettier checks passed.
- Browser keyboard checks passed: modal initial focus; Tab and Shift+Tab wrapping; Escape and trigger restoration; mobile login return to the menu toggle; mobile section focus; skip-link target; first-invalid-field focus and its error reference.
- Browser viewport checks at 320, 375, 768 and 1280 px showed no horizontal document overflow. Mobile and desktop layouts were visually reviewed.
- Declared flat-color contrast calculations: body text on white 5.63:1, secondary text on white 4.73:1, white on the primary blue 5.49:1, featured light text on blue 4.502:1, form border on the input background 3.20:1, footer links on the dark background 7.07:1. These are selected color pairs, not an audit of every rendered element or state.
- No real email was sent. No screen-reader audit, automated accessibility scan, real-device matrix or Lighthouse benchmark was completed.

## Interaction update — 2026-11-20

- Static business values now live in home-data.ts; repeated counts, course facts and rating stars share that source.
- Outside clicks dismiss the mobile menu. Invalid forms preserve input; valid demo submissions open the existing accessible dialog and reset the form.
- Automated verification: 25 tests across 5 files passed, including input boundaries, partial rating fills and focus restoration.
- These new interactions have automated coverage; the earlier browser checks above predate this update. Real-device and screen-reader verification remain pending.
