# Bookr QA Automation – Customer Sign-Up

## Project Overview
This project contains an automated customer sign-up journey test for the Bookr website using Playwright and TypeScript.

## Tools & Technologies
- Playwright
- TypeScript
- Node.js
- Chromium

## Test Scenario
The automated test covers the following steps:

1. Navigate to the Bookr website.
2. Click on **For customers** to open the customer-facing page.
3. Click on **Start free trial** to navigate to the Contact Us page.
4. Verify that the sign-up form is visible.
5. Enter the customer's full name.
6. Enter a phone number.
7. Select **Customer** from the Business or Customer dropdown.
8. Enter additional comments.
9. Click the **Submit** button to submit the form.
10. Verify the submission response.


## Installation

Install project dependencies:

```bash
npm install
```

Install Chromium:

```bash
npx playwright install chromium
```

## Run the Automated Test

```bash
npx playwright test --project=chromium
```

## Project Structure

- `tests/example.spec.ts` – Automated test source code.
- `playwright.config.ts` – Playwright configuration.
- `package.json` – Project dependencies.
- `README.md` – Project documentation.
