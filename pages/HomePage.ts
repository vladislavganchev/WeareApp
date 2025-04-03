import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    // Navigation locators
    readonly registerButton: Locator;
    readonly loginButton: Locator;
    readonly homeButton: Locator;
    readonly aboutUsButton: Locator;
    readonly latestPostsButton: Locator;
    readonly contactButton: Locator;

    // Search functionality locators
    readonly searchInput1: Locator;
    readonly searchInput2: Locator;
    readonly searchButton: Locator;
    readonly noResultsMessage: Locator;
    readonly seeProfileButtons: Locator;

    // Page verification locator
    readonly mainHeading: Locator;

    // Make page accessible
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        
        // Navigation locators
        this.registerButton = this.page.locator('.nav-link[href="/register"]');
        this.loginButton = this.page.locator('.nav-link[href="/login"]');
        this.homeButton = this.page.locator('.nav-link[href="/"]');
        this.aboutUsButton = this.page.locator('.nav-link[href="/about"]');
        this.latestPostsButton = this.page.locator('.nav-link[href="/posts"]');
        this.contactButton = this.page.locator('.nav-link[href="/contact"]');

        // Search functionality locators
        this.searchInput1 = this.page.locator('#searchParam1');
        this.searchInput2 = this.page.locator('#searchParam2');
        this.searchButton = this.page.locator('.btn.btn-primary');
        this.noResultsMessage = this.page.locator('h3.mb-3.bread', { hasText: 'There are no users existing in this search criteria.' });
        this.seeProfileButtons = this.page.locator('a.btn.btn-primary[href*="/auth/users/"]');

        // Page verification locator
        this.mainHeading = this.page.locator('#main-heading');
    }

    // Actions
    async goto(): Promise<void> {
        await this.page.goto('/');
    }

    async search(searchText: string): Promise<void> {
        await this.searchInput1.fill(searchText);
        await this.searchButton.click();
    }

    async clickRegisterButton(): Promise<void> {
        const registerButtons = await this.page.$$('.nav-link[href="/register"]');
        await registerButtons[0].click();
    }

    // New search methods
    async searchByProfession(profession: string): Promise<void> {
        await this.searchInput1.fill(profession);
        await this.searchButton.click();
    }

    async searchByName(name: string): Promise<void> {
        await this.searchInput2.fill(name);
        await this.searchButton.click();
    }

    async searchByBoth(profession: string, name: string): Promise<void> {
        await this.searchInput1.fill(profession);
        await this.searchInput2.fill(name);
        await this.searchButton.click();
    }

    async clickSeeProfile(index: number = 0): Promise<void> {
        const buttons = await this.seeProfileButtons.all();
        if (buttons.length > index) {
            await buttons[index].click();
        } else {
            throw new Error(`No See Profile button found at index ${index}`);
        }
    }
} 