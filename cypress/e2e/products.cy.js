const {faker} = require("@faker-js/faker");

describe('Test suite for admin users', () => {

    before(() => {
        cy.login();
    })

    beforeEach(() => {
        cy.get('[data-testid="home"]').click();
        cy.get("p").contains("Este é seu sistema para administrar seu ecommerce.").should("be.visible");
    })


  it('CT-05 - Create product by admin user', () => {
    const productName = faker.commerce.productName();
    const productPrice = faker.commerce.price({ min: 1, max: 9000, dec: 0 });
    const productDescription = faker.commerce.productDescription();
    const productQuant = faker.number.int({ min: 1, max: 100 });

    cy.get('[data-testid="cadastrar-produtos"]').click();

    cy.get("#nome").type(productName);
    cy.get("#price").type(productPrice);
    cy.get("#description").type(productDescription);
    cy.get("#quantity").type(productQuant);
    cy.get('input[type="file"]').selectFile('productImage.jpg');
    cy.get('[data-testid="cadastarProdutos"]').click();

    cy.get("h1").contains("Lista dos Produtos").should("be.visible");
    cy.get("td").contains(productName).should("be.visible");
    
    //Technical debt: implement a method to delete this product.
  })
})
