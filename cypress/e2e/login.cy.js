describe('Test suite for login', () => {

  it('CT-03 - Login admin user with incorrect credencials', () => {
    cy.visit('/');
    cy.get("button").contains("Entrar").click();
    cy.get("span").contains("Email é obrigatório").should("be.visible");
    cy.get("span").contains("Password é obrigatório").should("be.visible");

    cy.get("#password").type(Cypress.env('userAdminPassword'));
    cy.get("button").contains("Entrar").click();
    cy.get("span").contains("Email é obrigatório").should("be.visible");

    cy.get("#email").clear().type(Cypress.env('userAdminEmail'));
    cy.get("#password").clear();
    cy.get("button").contains("Entrar").click();
    cy.get("span").contains("Password não pode ficar em branco").should("be.visible");

    cy.get("#email").clear().type("incorrectUser@test.com");
    cy.get("#password").clear().type("incorrectPass");
    cy.get("button").contains("Entrar").click();
    cy.get("span").contains("Email e/ou senha inválidos").should("be.visible");
  })
  it('CT-04 - Login admin user with correct credencials', () => {
    cy.login();
    cy.get("p").contains("Este é seu sistema para administrar seu ecommerce.").should("be.visible");
  })
})

