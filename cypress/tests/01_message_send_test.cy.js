import { faker } from "@faker-js/faker";
import { MainPage } from"../fixtures/pages/mainPage.js";

const testData = require("../fixtures/testData.json");
const mainPage = new MainPage;

describe("Verify message sending on the main page", () => {

    let fullname = faker.person.fullName();
    let email = faker.internet.email();
    let phone = faker.phone.number();
    let subject = faker.lorem.sentence();
    let message = faker.lorem.paragraph();

  it.only("user send a message with valid data", () => {
    cy.visit('');
    cy.intercept("POST", "/message").as("sendMessageRequest");
    mainPage.sendMessage(fullname,email,phone,subject,message);
    cy.wait("@sendMessageRequest").then((interceptedRequest) => {
      expect(interceptedRequest.response.statusCode).to.eq(201);
    });
  });

  it("user can`t send a message with invalid email", () => {
    cy.visit('');
    cy.intercept("POST", "/message").as("sendMessageRequest");
    mainPage.sendMessage(fullname,testData.emailDoubleAt,phone,subject,message);
    cy.wait("@sendMessageRequest").then((interceptedRequest) => {
      expect(interceptedRequest.response.statusCode).to.eq(400);
    })
    mainPage.elements.errorGrowMessage().should('be.visible');
    mainPage.elements.errorGrowMessage().contains('должно иметь формат адреса электронной почты');
  })
})