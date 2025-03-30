import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
    // Form locators
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly categoryDropdown: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        super(page);
        // Form locators
        this.usernameInput = this.page.locator('#name');    
        this.emailInput = this.page.locator('#email');
        this.passwordInput = this.page.locator('#password');
        this.confirmPasswordInput = this.page.locator('#confirm');
        this.categoryDropdown = this.page.locator('[name="category.id"]');
        this.registerButton = this.page.locator('.login-button');
    }

    // Actions
    async selectProfessionalCategory(categoryText: string): Promise<void> {
        await this.categoryDropdown.selectOption({ label: categoryText });
    }
} 