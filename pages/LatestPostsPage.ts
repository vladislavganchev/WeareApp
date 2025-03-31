import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LatestPostsPage extends BasePage {
    // Page verification locators
    readonly pageTitle: Locator;

    // Filter locators
    readonly categoryDropdown: Locator;
    readonly browseButton: Locator;

    constructor(page: Page) {
        super(page);
        // Page verification locators
        this.pageTitle = this.page.locator('h1.mb-3.bread', { hasText: 'Explore all posts' });

        // Filter locators
        this.categoryDropdown = this.page.locator('select#name[name="name"]');
        this.browseButton = this.page.locator('.btn[type="submit"][value="Browse"]');
    }

    // Actions
    async selectCategory(categoryText: string): Promise<void> {
        await this.categoryDropdown.selectOption({ label: categoryText });
    }

    async filterByCategory(categoryText: string): Promise<void> {
        await this.selectCategory(categoryText);
        await this.browseButton.click();
    }
} 