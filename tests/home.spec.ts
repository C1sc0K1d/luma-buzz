import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('all sections and photos render without overflow or page errors', async ({ page }, info) => {
  const failures: string[] = [];
  page.on('pageerror', (error) => failures.push(error.message));
  await page.reload();
  await expect(page).toHaveTitle(/Luma/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('main h1')).toHaveText('Build skills that actually move you forward.');
  for (const section of [
    '.intro',
    '#courses',
    '#featured-course',
    '#how-it-works',
    '.learner-results',
    '#community',
    '#contact',
    '.join-banner',
    '.site-footer',
  ]) {
    await page.locator(section).scrollIntoViewIfNeeded();
    await expect(page.locator(section)).toBeVisible();
  }
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0))
      .toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  expect(failures).toEqual([]);
  await page.screenshot({ path: info.outputPath('full-page.png'), fullPage: true });
  await page.locator('#community').screenshot({ path: info.outputPath('community.png') });
  await page.locator('.intro').screenshot({ path: info.outputPath('intro.png') });
});

test('navigation, outside dismissal and Escape work', async ({ page }, info) => {
  test.skip(info.project.name === 'desktop', 'Desktop has inline navigation.');
  const toggle = page.getByRole('button', { name: 'Open navigation menu' });
  await toggle.click();
  const menu = page.getByRole('navigation', { name: 'Mobile navigation' });
  await expect(menu).toBeVisible();
  await page.getByRole('heading', { level: 1 }).click();
  await expect(menu).toBeHidden();
  await toggle.click();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await menu.getByRole('link', { name: 'Community', exact: true }).click();
  await expect(menu).toBeHidden();
  await expect(page.locator('#community')).toBeFocused();
});

test('dialog is keyboard accessible and restores focus', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'View course', exact: true });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  const close = dialog.getByRole('button', { name: 'Close dialog' });
  await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Keep exploring' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('contact validates, caps the question and clears only after valid submission', async ({
  page,
}) => {
  const send = page.getByRole('button', { name: 'Send message', exact: true });
  await send.click();
  await expect(page.getByLabel('Full name', { exact: true })).toBeFocused();
  await page.getByLabel('Full name', { exact: true }).fill('Alex');
  await page.getByLabel('Email', { exact: true }).fill('alex@example');
  await page.getByLabel('Your question', { exact: true }).fill('A course question');
  await send.click();
  await expect(page.getByLabel('Email', { exact: true })).toBeFocused();
  await expect(page.getByRole('dialog')).toBeHidden();
  await page.getByLabel('Email', { exact: true }).fill('alex@example.com');
  const question = page.getByLabel('Your question', { exact: true });
  await question.fill('a'.repeat(1600));
  await expect(question).toHaveValue('a'.repeat(1500));
  await expect(page.locator('#question-hint')).toHaveText('1500 / 1500 characters');
  await send.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toContainText('Message sent — simulation');
  await expect(dialog).toContainText('24 business hours');
  await dialog.getByRole('button', { name: 'Done', exact: true }).click();
  await expect(send).toBeFocused();
  for (const label of ['Full name', 'Email', 'Your question'])
    await expect(page.getByLabel(label, { exact: true })).toHaveValue('');
  await expect(page.getByRole('form', { name: 'Contact us' }).getByRole('alert')).toHaveCount(0);
  await expect(page.locator('.contact-form [aria-invalid="true"]')).toHaveCount(0);
});

test('skip link and reduced motion are respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const skipLink = page.getByRole('link', { name: 'Skip to content' });
  await expect(skipLink).toHaveCSS('clip-path', 'inset(50%)');
  await page.keyboard.press('Tab');
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveCSS('clip-path', 'none');
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
});
