import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignInPage extends BasePage {
    // Form locators
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        // Form locators
        this.usernameInput = this.page.locator('#username');
        this.passwordInput = this.page.locator('#password');
        this.loginButton = this.page.locator('button[value="Login"]');
    }

    // Actions
    // Add your actions here
} 