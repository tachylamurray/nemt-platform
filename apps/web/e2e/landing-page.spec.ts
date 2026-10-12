import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/NEMT Platform/)
  })

  test('should have proper accessibility structure', async ({ page }) => {
    await page.goto('/')
    
    // Check for main navigation
    const nav = page.getByRole('navigation', { name: 'Main navigation' })
    await expect(nav).toBeVisible()
    
    // Check for heading hierarchy
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    
    // Check for landmark regions
    const main = page.getByRole('main')
    await expect(main).toBeVisible()
  })

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/')
    
    // Test Book Now button
    const bookButton = page.getByRole('link', { name: /book now/i })
    await bookButton.click()
    await expect(page).toHaveURL(/\/booking/)
  })

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/')
    
    // Tab through interactive elements
    await page.keyboard.press('Tab')
    const firstFocusable = page.locator(':focus')
    await expect(firstFocusable).toBeVisible()
    
    // Test Enter key on focused link
    await page.keyboard.press('Enter')
  })

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/')
    
    // Check for ARIA labels on interactive elements
    const demoButton = page.getByRole('link', { name: /schedule demo/i })
    await expect(demoButton).toHaveAttribute('aria-label')
  })
})

test.describe('Lead Capture Form', () => {
  test('should validate form inputs', async ({ page }) => {
    await page.goto('/demo-request')
    
    // Fill out form
    await page.fill('input[name="organizationName"]', 'Test Clinic')
    await page.fill('input[name="contactName"]', 'John Doe')
    await page.fill('input[name="contactEmail"]', 'john@test.com')
    await page.fill('input[name="contactPhone"]', '555-123-4567')
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Check for success message
    await expect(page.getByText(/thank you/i)).toBeVisible()
  })
})
