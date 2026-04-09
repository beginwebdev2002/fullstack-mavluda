# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: example.spec.ts >> has title
- Location: tests/example.spec.ts:3:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4200/admin/login
Call log:
  - navigating to "http://localhost:4200/admin/login", waiting until "load"

```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 |
  3 | test('has title', async ({ page }) => {
> 4 |   await page.goto('http://localhost:4200/admin/login');
    |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:4200/admin/login
  5 |   await expect(page).toHaveTitle('Mavluda Beauty | Medical Luxury Ecosystem');
  6 | });
  7 |
```