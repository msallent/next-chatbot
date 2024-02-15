import { test, expect } from '@playwright/test';

test('Creates a user, sends a message and checks chat history', async ({ page }) => {
  await page.goto('/');

  // Creates user
  const nameInput = page.getByPlaceholder("what's your name?");
  await nameInput.click();
  await nameInput.fill('Test User');
  await nameInput.press('Enter');

  // Sends a message
  const chatInput = page.getByPlaceholder('Say something...');
  await chatInput.click();
  await chatInput.fill('Hello, this is a test message.');
  await chatInput.press('Enter');

  // Expect textarea to be replaced by the loading spinner
  await expect(chatInput).not.toBeInViewport();

  // Checks the message was sent, and expects a response
  await expect(page.getByText('This is a test message')).toBeVisible();
  await expect(page.getByText(/Assistant/)).toBeVisible();

  // Clicks link to Chat History
  await page.getByRole('link', { name: 'Chat History' }).click();

  // Expects nothing to be shown until a Chat Session is selected
  await expect(page.getByText(/Please select a session/)).toBeVisible();
  await page.getByRole('button', { name: /Chat Session #1/ }).click();

  // Expects to see the same messages which were sent in the chat
  await expect(page.getByText('This is a test message')).toBeVisible();
  await expect(page.getByText(/Assistant/)).toBeVisible();
});

test('Redirects to chat if user has already been created', async ({ page }) => {
  await page.goto('/');

  // Creates user
  const nameInput = page.getByPlaceholder("what's your name?");
  await nameInput.click();
  await nameInput.fill('Test User');
  await nameInput.press('Enter');

  // Expect to be redirected after creating user
  await expect(page).toHaveURL('/chat');

  // Navigate back and expect to be redirected again
  await page.goto('/');
  await expect(page).toHaveURL('/chat');
});

test('Redirects to homepage if no user has been created first', async ({ page }) => {
  await page.goto('/chat');
  await expect(page).toHaveURL('/');

  await page.goto('/chat-history');
  await expect(page).toHaveURL('/');
});
