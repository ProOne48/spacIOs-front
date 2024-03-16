/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })

import { SpaceOwner } from '../../src/models/space-owner';
import { Serialize } from 'dcerialize';
import { setStorageObject } from '../../src/utils/storage-manager';

Cypress.Commands.add('login', (fallbackRoute = '/home') => {
  localStorage.setItem('accessToken', JSON.stringify('ASY23RT&asdSdB'));
  const spaceOwner: SpaceOwner = {
    id: 1,
    name: 'mock',
    email: 'mock@gmail.com',
    spaces: [
      {
        id: 1,
        name: 'mock',
        description: 'mock',
        maxCapacity: 20,
        capacity: 0,
        spaceOwnerId: 1,
        tables: [
          {
            id: 1,
            tableNumber: 1,
            nChairs: 4,
            occupied: false,
            reservable: true,
            spaceId: 1,
            qrCode: 'mock'
          }
        ]
      }
    ]
  };

  setStorageObject(
    'userData',
    Serialize(spaceOwner, () => SpaceOwner),
    'local'
  );

  cy.intercept('POST', Cypress.env('API_URL') + '/auth/google-login', {
    fixture: 'login.json'
  });

  cy.intercept('GET', Cypress.env('API_URL') + '/space-owner/actual', {
    fixture: 'actual-user.json'
  });

  cy.intercept('GET', Cypress.env('API_URL') + '/space/actual-spaces', {
    fixture: 'actual-spaces.json'
  });

  cy.visit(fallbackRoute);
});

//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
