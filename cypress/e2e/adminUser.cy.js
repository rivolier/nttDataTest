const {faker} = require("@faker-js/faker");

describe('Test suite for admin users', () => {

    before(() => {
        cy.login();
    })

    beforeEach(() => {
        cy.get('[data-testid="home"]').click();
        cy.get("p").contains("Este é seu sistema para administrar seu ecommerce.").should("be.visible");
    })


  it('CT-01 - Create regular user by admin user', () => {
    const randomName = faker.person.fullName(); 
    const randomEmail = faker.internet.email();
    const password = "123456"

    cy.get('[data-testid="cadastrarUsuarios"]').click();

    cy.get('[data-testid="cadastrarUsuario"]').click()
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


    cy.get("#nome").clear().type(randomName);
    cy.get("#email").clear().type(randomEmail);
    cy.get("#password").clear().type(password);
    cy.get('[data-testid="cadastrarUsuario"]').click()

    cy.get("h1").contains("Lista dos usuários").should("be.visible");

    cy.get('[data-testid="logout"]').click();

    cy.login(randomEmail, password);
    cy.get("h1").contains("Serverest Store").should("be.visible");

    cy.get('[data-testid="logout"]').click();
    cy.login();

    //Technical debt: implement a method to delete this user.
  })
})
