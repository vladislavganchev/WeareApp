import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
        await this.page.waitForSelector(selector, { timeout });
    }

    async click(selector: string): Promise<void> {
        await this.waitForElement(selector);
        await this.page.click(selector);
    }

    async fill(selector: string, text: string): Promise<void> {
        await this.waitForElement(selector);
        await this.page.fill(selector, text);
    }

    async getText(selector: string): Promise<string | null> {
        await this.waitForElement(selector);
        return await this.page.textContent(selector);
    }
} 