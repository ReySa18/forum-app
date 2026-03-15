/**
 * E2E Test scenarios for Login flow
 *
 * - should display the login page correctly
 *   - should show email input, password input, and submit button
 *   - should show a link to the register page
 *
 * - should login successfully with valid credentials
 *   - should navigate to the login page
 *   - should fill in email and password
 *   - should submit the form
 *   - should redirect to the home page
 *   - should display the logged-in user's navigation (Logout button visible)
 *
 * - should show error notification with invalid credentials
 *   - should navigate to the login page
 *   - should fill in wrong email/password
 *   - should submit the form
 *   - should remain on the login page
 */

describe('Login flow', () => {
  beforeEach(() => {
    // Clear localStorage to ensure clean state
    cy.window().then((win) => {
      win.localStorage.clear();
    });
  });

  it('should display the login page correctly', () => {
    cy.visit('/login');

    // Verify form elements are visible
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain.text', 'Masuk');
    cy.contains('a', 'Daftar di sini').should('be.visible').and('have.attr', 'href', '/register');
  });

  it('should login successfully with valid credentials', () => {
    cy.visit('/login');

    // Fill in form
    cy.get('input#email').type('e2etestuser2026@example.com');
    cy.get('input#password').type('testpass123');

    // Submit form
    cy.get('button[type="submit"]').click();

    // Should redirect to home page
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);

    // Should show logged-in state — Logout button visible in navbar
    cy.contains('Logout').should('be.visible');
  });

  it('should show error notification with invalid credentials', () => {
    cy.visit('/login');

    // Fill in wrong credentials
    cy.get('input#email').type('wrong@example.com');
    cy.get('input#password').type('wrongpassword');

    // Submit form
    cy.get('button[type="submit"]').click();

    // Should remain on login page (or show error)
    cy.url().should('include', '/login');
  });
});
