import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly registerButton: Locator;
    readonly signInButton: Locator;
    readonly homeButton: Locator;
    readonly latestPostsButton: Locator;
    readonly aboutUsButton: Locator;
    readonly weareLogo: Locator;

    // Search functionality locators
    readonly searchLabel: Locator;
    readonly professionSearchInput: Locator;
    readonly professionalNameSearchInput: Locator;
    readonly searchButton: Locator;

    // Page verification locators
    readonly mainHeading: Locator;

    constructor(page: Page) {
        super(page);
        // Navigation bar locators
        this.registerButton = this.page.locator('.nav-link[href="/register"]');
        this.signInButton = this.page.locator('.nav-link[href="/login"]');
        this.homeButton = this.page.locator('.nav-link[href="/"]');
        this.latestPostsButton = this.page.locator('.nav-link[href="/posts"]');
        this.aboutUsButton = this.page.locator('.nav-link[href="/about-us"]');
        this.weareLogo = this.page.locator('.navbar-brand');

        // Search functionality locators
        this.searchLabel = this.page.locator('[role="tablist"]', { hasText: 'Find your Professional' });
        this.professionSearchInput = this.page.locator('#searchParam1');
        this.professionalNameSearchInput = this.page.locator('#searchParam2');
        this.searchButton = this.page.locator('.btn[type="submit"]');

        // Page verification locators
        this.mainHeading = this.page.locator('h1.mb-2', { hasText: 'The Easiest Way to Hack the Crisis' });
    }

    // Actions
    async clickRegisterButton(): Promise<void> {
        const registerButtons = await this.page.$$('.nav-link[href="/register"]');
        await registerButtons[0].click();
    }
} 