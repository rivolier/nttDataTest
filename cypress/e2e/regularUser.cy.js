const {faker} = require("@faker-js/faker");

describe('Test suite for regular users', () => {

  it('CT-02 - Create regular user', () => {
    const randomName = faker.person.fullName(); 
    const randomEmail = faker.internet.email();
    const password = "123456"

    cy.visit('/');
    cy.get("#email").should("be.visible");

    cy.get("a").contains("Cadastre-se").click();

    cy.get("h2").contains("Cadastro").should("be.visible");

    cy.get("button").contains("Cadastrar").click();
    cy.get("span").contains("Nome é obrigatório").should("be.visible");
    cy.get("span").contains("Email é obrigatório").should("be.visible");
    cy.get("span").contains("Password é obrigatório").should("be.visible");

    cy.get("#email").clear().type(randomEmail);
    cy.get("#password").clear().type(password);
    cy.get("button").contains("Cadastrar").click();
    cy.get("span").contains("Nome é obrigatório").should("be.visible");

    cy.get("#nome").clear().type(randomName)
    cy.get("#email").clear();
    cy.get("#password").clear().type(password);
    cy.get("button").contains("Cadastrar").click();
    cy.get("span").contains("Email não pode ficar em branco").should("be.visible");

    cy.get("#nome").clear().type(randomName)
    cy.get("#email").clear().type(randomEmail);
    cy.get("#password").clear();
    cy.get("button").contains("Cadastrar").click();
    cy.get("span").contains("Password não pode ficar em branco").should("be.visible");

    cy.get("#nome").clear().type(randomName)
    cy.get("#email").clear().type(randomEmail);
    cy.get("#password").clear().type(password);
    cy.get("button").contains("Cadastrar").click();
    cy.get("a").contains("Cadastro realizado com sucesso").should("be.visible");

    cy.get("h1").contains("Serverest Store").should("be.visible");

    //Technical debt: implement a method to delete this user.
  })
})