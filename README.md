# Luma

I built this landing page for the Buzzvel Front-End Challenge using **Next.js App Router, TypeScript and Tailwind CSS**. It follows the supplied mobile and desktop designs, with the original images and all text in English.

## Getting started

I used Node.js 24.21.0. From the project folder, run:

```sh
npm ci
npm run dev
```

Then open [localhost:4200](http://localhost:4200). Keep the terminal running while you use the page. To stop it, press `Ctrl+C`.

`npm ci` creates `node_modules`, which holds the project's dependencies. That folder is needed locally but is not committed to Git.

## Trying it on your phone

Use `npm run dev` when testing on your computer. To open the page from your phone, stop that server with `Ctrl+C`, then run:

```sh
npm run dev:lan
```

Connect your phone to the same local network as your computer. The command prints links for the computer's network connections, for example:

```text
Ethernet: http://192.168.15.17:4200
```

Open the link printed for your Wi-Fi or Ethernet connection in your phone's browser. Your IP may differ from the example. Keep the server running on your computer.

Next.js may also display `http://0.0.0.0:4200`. This means the server accepts network connections; use the IP link above it on your phone. If you choose a different port, update the port in the link too. If the page does not open, check that both devices are on the same network and that your firewall allows Node.js on your private network.

## Production build

Stop the development server first, then run:

```sh
npm run build
npm start
```

The production version also runs on port 4200.

## A few decisions

- I started with the mobile layout and adapted the tablet layout between the two supplied designs. Components live in `src/features/home`, with typed props and editable mock values in `home-data.ts`. Ratings, stars and learner counts use that data.
- Tailwind styles are grouped into BEM classes with `@apply`. Custom CSS handles the photo collage and decorative shapes. Images use `next/image`, and the Inter font is stored locally.
- The menu closes on outside click or Escape. Course details use a shared dialog. Links without a supplied page design open a short explanation or lead to contact.
- The contact form checks the email and limits questions to 1,500 characters. A valid submission opens a confirmation and clears the fields. This is a demo: no message is sent.

The page includes labeled fields, image descriptions, visible keyboard focus, a skip link and dialog focus handling. Animations and scrolling respect reduced-motion preferences.

## Checks and remaining work

```sh
npm run build
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run format:check
```

For browser tests, first run `npx playwright install chromium`, or set `PLAYWRIGHT_CHANNEL=msedge` to use an installed Edge. The tests use the production build on port 4201.

The recorded checks passed: 16 unit tests and 14 browser tests, with one desktop case skipped because it only applies to the mobile menu. Desktop and mobile screenshots were also reviewed. Details are in the [technical walkthrough](docs/TECHNICAL_WALKTHROUGH.md).

There is no backend, CMS, sign-in or email service. Testing on physical phones, with screen readers, in Safari/Firefox, and with Lighthouse is still pending. Installation also warns that ESLint 9 is out of support; it is retained for compatibility with the current Next.js plugins.

## Time and AI use

I spent around **6–9 hours over three days**, working 2–3 hours a day.

I used **OpenAI Codex** to help with implementation, refactoring, tests, debugging and documentation. I did not use any other AI tools.
