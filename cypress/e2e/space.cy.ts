describe('Space test', () => {
  context('Route redirections', () => {
    it('should redirect to login page if not logged in', () => {
      cy.visit('/space');
      cy.url().should('include', '/login');
    });
  });
});
