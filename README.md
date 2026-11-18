# Playwright Web Automation Testing

A learning repository for web UI test automation with [Playwright](https://playwright.dev/) and TypeScript. The tests run against the [Bondar Academy UI Playground](https://playground.bondaracademy.com/).

## Repository structure

```
.
├── PLAYWRIGHT-UI-TESTING/   # Playwright UI tests (TypeScript)
│   ├── tests/
│   │   ├── first-test.spec.ts
│   │   ├── auto-waiting.spec.ts
│   │   └── ui-components.spec.ts
│   └── playwright.config.ts
└── AI_Learning_Test_Lab/    # AI learning experiments
```

## What the tests cover

| Area | Techniques |
|---|---|
| Input fields | `fill`, `clear`, `pressSequentially`, `inputValue`, value assertions |
| Radio buttons and checkboxes | `check`, `uncheck`, `isChecked`, `toBeChecked` |
| Lists and dropdowns | native `<select>` and custom `nb-select` |
| Tooltips | `hover`, `getByRole('tooltip')` |
| Browser dialogs | `page.on('dialog')` to accept or dismiss |
| Web tables | row filtering, inline edit, table filters |
| Datepicker | dynamic future date calculation |
| Sliders | SVG attribute change and mouse drag |
| iFrames | `frameLocator` |
| Drag and drop | `dragTo` and manual mouse actions |
| Auto-waiting and timeouts | action, expect and test timeouts |

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- [Git](https://git-scm.com/)

## Getting started

```bash
# 1. Clone the repository
git clone https://github.com/PhuongNgo04/Playwright-Web-Automation-Testing.git
cd Playwright-Web-Automation-Testing/PLAYWRIGHT-UI-TESTING

# 2. Install dependencies
npm install

# 3. Install the Playwright browsers
npx playwright install
```

## Running the tests

```bash
# Run all tests in all browsers (chromium, firefox, webkit)
npx playwright test

# Run one file
npx playwright test tests/ui-components.spec.ts

# Run one browser
npx playwright test --project=chromium

# Run a test by name
npx playwright test -g "Drag and drop"

# Run in headed mode
npx playwright test --headed

# Open the interactive UI mode
npx playwright test --ui
```

## Reports and debugging

```bash
# Open the last HTML report
npx playwright show-report

# Run in debug mode with the Playwright Inspector
npx playwright test --debug
```

Failed tests write their results to `test-results/` and `playwright-report/`. Both folders are ignored by Git.

## Notes

- Tests depend on a public demo site, so they can fail if the site is slow or changes.
- Some tests use custom timeouts (`test.setTimeout`) because the site is slow on certain browsers.

## Author

Maintained by [PhuongNgo04](https://github.com/PhuongNgo04).
