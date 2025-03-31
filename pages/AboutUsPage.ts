import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AboutUsPage extends BasePage {
    // Page verification locators
    readonly pageTitle: Locator;

    constructor(page: Page) {
        super(page);
        // Page verification locators
        this.pageTitle = this.page.locator('h1.mb-3.bread', { hasText: 'About us' });
    }

    // Actions
    // Add your actions here
} 