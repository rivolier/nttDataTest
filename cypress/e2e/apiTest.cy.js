const { faker } = require("@faker-js/faker");

const baseApiUrl = "https://serverest.dev";

describe("Testes de API do Serverest", () => {
  let userToken = "";
  const randomName = faker.person.fullName();
  const randomEmail = faker.internet.email();
  const password = "123456";

  before(() => {
      cy.request({
        method: "POST",
        url: `${baseApiUrl}/login`,
        body: {
          email: Cypress.env("userAdminEmail"),
          password: Cypress.env("userAdminPassword"),
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Login realizado com sucesso");
        expect(response.body).to.have.property("authorization");
        userToken = response.body.authorization;
      });
  });

  it("Regular User: Create, confirm and delete it", () => {
    cy.request({
      method: "POST",
      url: `${baseApiUrl}/usuarios`,
      headers: {
        Authorization: userToken,
      },
      body: {
        nome: randomName,
        email: randomEmail,
        password: password,
        administrador: "false",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("_id");
      const regularUserId = response.body._id;

      cy.request({
        method: "GET",
        url: `${baseApiUrl}/usuarios`,
        headers: {
          Authorization: userToken,
        },
        qs: { email: randomEmail },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.quantidade).to.eq(1);
        expect(response.body.usuarios[0].nome).to.eq(randomName);
        expect(response.body.usuarios[0].email).to.eq(randomEmail);
        expect(response.body.usuarios[0].administrador).to.eq("false");
        expect(response.body.usuarios[0]._id).to.eq(regularUserId);
      });

      cy.request({
        method: "DELETE",
        url: `${baseApiUrl}/usuarios/${regularUserId}`,
        headers: {
          Authorization: userToken,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Registro excluído com sucesso");
      });
    });
  });

  it("List all users", () => {
    cy.request({
      method: "GET",
      url: `${baseApiUrl}/usuarios`,
      headers: {
        Authorization: userToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body.quantidade).to.be.gte(0);
      expect(response.body.usuarios).to.be.an("array");

      response.body.usuarios.forEach((user) => {
        expect(user.nome).to.be.a("string");
        expect(user.email).to.be.a("string");
        expect(user.password).to.be.a("string");
        expect(user.administrador).to.be.a("string");
        expect(user._id).to.be.a("string");
      });
    });
  });

  it("Product: Create, confirm and delete it", () => {
    const productName = faker.commerce.productName();
    const productPrice = faker.commerce.price({ min: 1, max: 9000, dec: 0 });
    const productDescription = faker.commerce.productDescription();
    const productQuant = faker.number.int({ min: 1, max: 100 });
    cy.request({
      method: "POST",
      url: `${baseApiUrl}/produtos`,
      headers: {
        Authorization: userToken,
      },
      body: {
        nome: productName,
        preco: productPrice,
        descricao: productDescription,
        quantidade: productQuant,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
      expect(response.body).to.have.property("_id");
      const productId = response.body._id;

      cy.request({
        method: "GET",
        url: `${baseApiUrl}/produtos/${productId}`,
        headers: {
          Authorization: userToken,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.eq(productName);
        expect(response.body.preco).to.eq(parseInt(productPrice));
        expect(response.body.descricao).to.eq(productDescription);
        expect(response.body.quantidade).to.eq(parseInt(productQuant));
        expect(response.body._id).to.eq(productId);
      });

      cy.request({
        method: "DELETE",
        url: `${baseApiUrl}/produtos/${productId}`,
        headers: {
          Authorization: userToken,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq("Registro excluído com sucesso");
      });

      cy.request({
        method: "GET",
        url: `${baseApiUrl}/produtos/${productId}`,
        headers: {
          Authorization: userToken,
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.message).to.eq("Produto não encontrado");
      });
    });
  });

  it("List all products", () => {

      cy.request({
      method: "GET",
      url: `${baseApiUrl}/produtos`,
      headers: {
        Authorization: userToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body.quantidade).to.be.gte(0);
      expect(response.body.produtos).to.be.an("array");

      response.body.produtos.forEach((user) => {
        expect(user.nome).to.be.a("string");
        expect(user.preco).to.be.gte(0);
        expect(user.descricao).to.be.a("string");
        expect(user.quantidade).to.be.gte(0);
        expect(user._id).to.be.a("string");
      });
    });
  })
});
