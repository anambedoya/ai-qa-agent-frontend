import { expect, test } from '@playwright/test';

// BOOT-002, BOOT-007: the real browser starts without backend or external services.
test('loads the foundation without application errors or API dependencies', async ({
  page,
  baseURL,
}) => {
  const errors: string[] = [];
  const unexpectedRequests: string[] = [];
  if (!baseURL) throw new Error('The browser test requires a configured baseURL.');
  const origin = new URL(baseURL).origin;

  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('requestfailed', (request) => errors.push(`Request failed: ${request.url()}`));

  await page.route('**/*', async (route) => {
    const request = route.request();
    const isApi = ['fetch', 'xhr'].includes(request.resourceType());
    const isExternal = new URL(request.url()).origin !== origin;
    if (isApi || isExternal) {
      unexpectedRequests.push(request.url());
      await route.abort();
      return;
    }
    await route.continue();
  });

  await page.goto('/');
  await expect(page).toHaveTitle('AI QA Agent');
  const main = page.getByRole('main');
  await expect(main.getByRole('heading', { name: 'AI QA Agent', exact: true })).toBeVisible();
  await expect(main.getByText('The project foundation is ready.', { exact: true })).toBeVisible();
  await expect(main.getByRole('button')).toHaveCount(0);
  await expect(main.getByRole('textbox')).toHaveCount(0);
  await page.waitForLoadState('networkidle');

  expect(unexpectedRequests, 'No application API or external-service requests').toEqual([]);
  expect(errors, 'No browser errors or failed requests').toEqual([]);
});
