describe('Home page tests', () => {
  beforeEach(() => {
    cy.login();
  });
  it('should display the home page', () => {
    cy.url().should('include', '/home');

    cy.get('[data-cy=space-grid]').should('be.visible');
    cy.get('[data-cy=space-tile]').should('have.length', 4);
  });

  it('should display the space info modal', () => {
    cy.get('[data-cy=add-space]').click();
    cy.get('[data-cy=space-info-modal]').should('be.visible');

    cy.get('[data-cy=space-info-modal-title]').should('have.text', 'Create a Space');

    cy.get('[data-cy=space-info-modal-close]').click();
    cy.get('[data-cy=space-info-modal]').should('not.exist');
  });
});
