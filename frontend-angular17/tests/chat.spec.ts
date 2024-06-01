import { test, expect } from '@playwright/test';

test('send a message', async ({ page }) => {
  await page.goto('/');
  
  // wait for the websocket to connect
  await page.locator('#connection-state', {hasText: "Status: Connected!"}).waitFor();

  await page.locator('#input-username').click();
  await page.locator('#input-username').fill('TestUsername');
  const input_message = page.locator('#input-message');
  await input_message.click();
  await input_message.fill('test_message');
  await page.getByRole('button', { name: 'Send' }).click();

  const messages = await page.locator('.p-scrollpanel-content');
  const message = messages.getByText('TestUsername : test_message');
  await expect(message).toBeVisible();
});