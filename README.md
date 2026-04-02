# GoWish Test Automation

Automated test framework for [onskeskyen.dk](https://onskeskyen.dk) built with Playwright and TypeScript.

## Stack

- Playwright
- TypeScript
- Node.js 20+
- GitHub Actions — CI/CD

## Project Structure
```
├── tests/
│   ├── auth.setup.ts
│   └── wishlist.spec.ts
├── support/
│   ├── constants/
│   │   └── constants.ts
│   ├── fixtures/
│   │   └── index.ts
│   ├── helpers/
│   │   └── ElementHelper.ts
│   └── pageObjects/
│       ├── documents/
│       │   └── wishlistPage.ts
│       └── forms/
│           └── LoginPage.ts
├── .env.example
└── playwright.config.ts
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install chromium
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Fill in `.env`:
```
USER_EMAIL=your@email.com
USER_PASSWORD=yourpassword
```

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run in headed mode:
```bash
npx playwright test --headed
```

Run specific test file:
```bash
npx playwright test tests/wishlist.spec.ts
```

View HTML report:
```bash
npx playwright show-report
```

## Tests

The most critical user flows for a wishlist service are account authentication and wishlist management — without these the core product doesn't work.

**`auth.setup.ts`** — authenticates once before all tests and saves session state, so tests don't repeat login on every run.

**`wishlist.spec.ts`** — covers the wishlist creation flow:

## CI

GitHub Actions workflow runs on every push and pull request to `main`. The pipeline installs dependencies, caches Playwright browsers and runs all tests in parallel. HTML report is uploaded as an artifact after each run.