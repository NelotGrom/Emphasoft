import { faker } from "@faker-js/faker";
import { MainPage } from"../fixtures/pages/mainPage.js";
//import { RoomAdminPage } from"../fixtures/pages/RoomAdminPage.js";

const testData = require("../fixtures/testData.json");
const mainPage = new MainPage;
//const roomAdminPage = new RoomAdminPage;

describe("Verify message sending on the main page", () => {

    let fullname = faker.person.fullName();
    let email = faker.internet.email();
    let phone = faker.phone.number();
    let subject = faker.lorem.sentence();
    let message = faker.lorem.paragraph();

  it("user send a message with valid data", () => {
    cy.visit('');
    mainPage.sendMessage(fullname,email,phone,subject,message);
  });

  it("user can`t send a message with invalid email", () => {
    cy.visit('');
    mainPage.sendMessage(fullname,testData.emailDoubleAt,phone,subject,message);
  })
})