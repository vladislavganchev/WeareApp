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

    // Error message locators
    readonly emailError: Locator;
    readonly passwordError: Locator;
    readonly passwordConfirmError: Locator;
    readonly error500Page: Locator;

    // Make page accessible
    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
        // Form locators
        this.usernameInput = this.page.locator('#name');    
        this.emailInput = this.page.locator('#email');
        this.passwordInput = this.page.locator('#password');
        this.confirmPasswordInput = this.page.locator('#confirm');
        this.categoryDropdown = this.page.locator('[name="category.id"]');
        this.registerButton = this.page.locator('.login-button');

        // Error message locators
        this.emailError = this.page.locator('text="this doesn\'t look like valid email"');
        this.passwordError = this.page.locator('text="password must be minimum 6 characters"');
        this.passwordConfirmError = this.page.locator('text="Your password is not confirmed"');
        this.error500Page = this.page.locator('h1:has-text("Whitelabel Error Page")');
    }

    // Actions
    async selectProfessionalCategory(categoryText: string): Promise<void> {
        await this.categoryDropdown.selectOption({ label: categoryText });
    }
} 