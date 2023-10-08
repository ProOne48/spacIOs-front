describe('Public space test', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.intercept('GET', `${Cypress.env('API_URL')}/space`, { fixture: 'public-space.json' }).as('getPublicSpace');

    cy.get('[data-cy=navbar-search]').should('be.visible');
    cy.get('[data-cy=navbar-search]').click();

    cy.wait('@getPublicSpace');
  });

  it('should display the public space list', () => {
    cy.url().should('include', '/public/space');

    cy.get('[data-cy=public-space-item]').should('have.length', 1);
  });
});
