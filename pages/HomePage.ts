import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly registerButton: Locator;
    readonly signInButton: Locator;
    readonly homeButton: Locator;
    readonly latestPostsButton: Locator;
    readonly aboutUsButton: Locator;
    readonly weareLogo: Locator;

    constructor(page: Page) {
        super(page);
        // Navigation bar locators
        this.registerButton = this.page.locator('.nav-link[href="/register"]');
        this.signInButton = this.page.locator('.nav-link[href="/login"]');
        this.homeButton = this.page.locator('.nav-link[href="/"]');
        this.latestPostsButton = this.page.locator('.nav-link[href="/posts"]');
        this.aboutUsButton = this.page.locator('.nav-link[href="/about-us"]');
        this.weareLogo = this.page.locator('.navbar-brand[href="/"]');
    }

    // Actions
    async clickRegisterButton(): Promise<void> {
        const registerButtons = await this.page.$$('.nav-link[href="/register"]');
        await registerButtons[0].click();
    }
} 