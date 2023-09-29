describe('Space test', () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-cy=space-3]').click();
  });

  context('Component display', () => {
    it('should display the space page', () => {
      cy.url().should('include', '/space/3');
      cy.get('[data-cy=space-edit]').should('be.visible');
      cy.get('[data-cy=space-delete]').should('be.visible');
      cy.get('[data-cy=space-upload-pdf]').should('be.visible');
      cy.get('[data-cy=space-see-pdf]').should('be.visible');
      cy.get('[data-cy=space-add-board]').should('be.visible');
    });

    it('should display the space info modal', () => {
      cy.get('[data-cy=space-edit]').click();
      cy.get('[data-cy=space-info-modal]').should('be.visible');

      cy.get('[data-cy=space-info-modal-title]').should('have.text', 'Edit a Space');

      cy.get('[data-cy=space-info-modal-close]').click();
      cy.get('[data-cy=space-info-modal]').should('not.exist');
    });

    it('should display the upload PDF modal', () => {
      cy.get('[data-cy=space-upload-pdf]').click();
      cy.get('[data-cy=pdf-form-modal]').should('be.visible');
      cy.get('[data-cy=pdf-form-modal-title]').should('have.text', 'Upload PDF');
      cy.get('[data-cy=pdf-form-modal-close]').click();
      cy.get('[data-cy=pdf-form-modal]').should('not.exist');
    });

    it('should display the add board modal', () => {
      cy.get('[data-cy=space-add-board]').click();

      cy.get('[data-cy=board-info-modal]').should('be.visible');
      cy.get('[data-cy=board-info-modal-title]').should('have.text', 'Create a table');
      cy.get('[data-cy=board-info-modal-accept]').should('be.disabled').and('have.text', ' Add table ');
      cy.get('[data-cy=board-info-modal-close]').click();
      cy.get('[data-cy=board-info-modal]').should('not.exist');
    });
  });

  context('Routes redirections', () => {
    it('should redirect to the pdf view page and show the PDF', () => {
      cy.get('[data-cy=space-see-pdf]').click();
      cy.url().should('include', '/space/3/pdf');
      cy.get('[data-cy=pdf-viewer]').should('be.visible');
    });
  });
});
