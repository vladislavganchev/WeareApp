import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';

// Utility functions for generating random data
function generateRandomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateRandomEmail(): string {
    const username = generateRandomString(8);
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${username}@${domain}`;
}

function generateRandomPassword(): string {
    // Generate password with at least 6 characters, including uppercase, lowercase, and numbers
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*';
    
    let password = '';
    // Ensure at least one of each required character type
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += special.charAt(Math.floor(Math.random() * special.length));
    
    // Add random characters to meet minimum length
    while (password.length < 6) {
        const allChars = uppercase + lowercase + numbers + special;
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    
    return password;
}

test.describe('Registration Tests', () => {
    let homePage: HomePage;
    let registerPage: RegisterPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        registerPage = new RegisterPage(page);
        await page.goto('/');
        await homePage.clickRegisterButton();
    });

    test('Successful registration with valid data', async () => {
        const username = generateRandomString(8);
        const email = generateRandomEmail();
        const password = generateRandomPassword();
        const confirmPassword = password;

        await registerPage.usernameInput.fill(username);
        await registerPage.emailInput.fill(email);
        await registerPage.passwordInput.fill(password);
        await registerPage.confirmPasswordInput.fill(confirmPassword);
        await registerPage.categoryDropdown.selectOption({ label: 'Software developer' });
        await registerPage.registerButton.click();

        // Add verification for successful registration
        // This could be checking for a success message, redirect to login page, etc.
        // You'll need to add the appropriate locator and verification
    });

    test('Registration fails with empty fields', async () => {
        await registerPage.registerButton.click();

        // Verify error messages for empty fields
        // You'll need to add the appropriate locators and verifications
    });

    test('Registration fails with invalid email format', async () => {
        const username = generateRandomString(8);
        const invalidEmail = 'invalid-email';
        const password = generateRandomPassword();
        const confirmPassword = password;

        await registerPage.usernameInput.fill(username);
        await registerPage.emailInput.fill(invalidEmail);
        await registerPage.passwordInput.fill(password);
        await registerPage.confirmPasswordInput.fill(confirmPassword);
        await registerPage.categoryDropdown.selectOption({ label: 'Software developer' });
        await registerPage.registerButton.click();

        // Verify error message for invalid email
        await expect(registerPage.emailError).toBeVisible();
    });

    test('Registration fails with password less than 6 characters', async () => {
        const username = generateRandomString(8);
        const email = generateRandomEmail();
        const shortPassword = '12345'; // Less than 6 characters
        const confirmPassword = shortPassword;

        await registerPage.usernameInput.fill(username);
        await registerPage.emailInput.fill(email);
        await registerPage.passwordInput.fill(shortPassword);
        await registerPage.confirmPasswordInput.fill(confirmPassword);
        await registerPage.categoryDropdown.selectOption({ label: 'Software developer' });
        
        // Click and wait for network idle to ensure form submission is complete
        await Promise.all([
            registerPage.registerButton.click(),
            registerPage.page.waitForLoadState('networkidle')
        ]);

        // Add a small delay to ensure the form submission is processed
        await registerPage.page.waitForTimeout(1000);

        // Debug: Log the current URL and page content
        console.log('Current URL:', await registerPage.page.url());
        console.log('Page content:', await registerPage.page.content());

        // Wait for the error message to appear with a longer timeout
        await expect(registerPage.passwordError).toBeVisible({ timeout: 15000 });
    });

    test('Registration fails with mismatched passwords', async () => {
        const username = generateRandomString(8);
        const email = generateRandomEmail();
        const password = generateRandomPassword();
        const differentPassword = generateRandomPassword();

        await registerPage.usernameInput.fill(username);
        await registerPage.emailInput.fill(email);
        await registerPage.passwordInput.fill(password);
        await registerPage.confirmPasswordInput.fill(differentPassword);
        await registerPage.categoryDropdown.selectOption({ label: 'Software developer' });
        await registerPage.registerButton.click();

        // Verify error message for mismatched passwords
        await expect(registerPage.passwordConfirmError).toBeVisible();
    });

    test('Registration fails with username less than 2 characters', async () => {
        const shortUsername = 'a'; // Less than 2 characters
        const email = generateRandomEmail();
        const password = generateRandomPassword();
        const confirmPassword = password;

        await registerPage.usernameInput.fill(shortUsername);
        await registerPage.emailInput.fill(email);
        await registerPage.passwordInput.fill(password);
        await registerPage.confirmPasswordInput.fill(confirmPassword);
        await registerPage.categoryDropdown.selectOption({ label: 'Software developer' });
        await registerPage.registerButton.click();

        // Verify that we get the 500 error page
        await expect(registerPage.error500Page).toBeVisible();
    });
}); 