describe('Public space test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy=navbar-search]').should('be.visible');
    cy.get('[data-cy=navbar-search]').click();
  });

  it('should display the public space list', () => {
    cy.url().should('include', '/public/space');

    cy.get('[data-cy=public-space-item]').should('have.length', 4);
  });
});
