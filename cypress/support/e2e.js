// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
const { faker } = require("@faker-js/faker");

before(() => {
    const randomName = faker.person.fullName(); 
    const randomEmail = faker.internet.email();
    const password = "123456"

    Cypress.env('userAdminName', randomName);
    Cypress.env('userAdminEmail', randomEmail);
    Cypress.env('userAdminPassword', password);
    
    cy.visit('/');

    cy.get('[data-testid="cadastrar"]').click();


    cy.get("#nome").clear().type(randomName);
    cy.get("#email").clear().type(randomEmail);
    cy.get("#password").clear().type(password);
    cy.get('[data-testid="checkbox"]').check().should("be.checked");
    cy.get('[data-testid="cadastrar"]').click()

    cy.get("h1").contains(`Bem Vindo ${randomName}`).should("be.visible");

    cy.get('[data-testid="logout"]').click();
    cy.get('[data-testid="entrar"]').should("be.visible");

    //Technical debt: implement a method to delete this user.
  })

