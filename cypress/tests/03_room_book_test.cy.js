import { faker } from "@faker-js/faker";
import { MainPage } from "../fixtures/pages/mainPage.js";

const testData = require("../fixtures/testData.json");

const mainPage = new MainPage();

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("Request failed with status code 500")) {
    return false;
  }
  return true;
});

describe("Verify room adding with the admin page", () => {
  let firstName = faker.person.firstName();
  let lastName = faker.person.lastName();
  let email = faker.internet.email();
  let phone = faker.phone.number();

  it("Booking a room without picked dates", () => {
    cy.visit("/");
    mainPage.buttons.bookRoomButton(1).should("have.text", "Book this room");
    mainPage.bookRoomFromList(1);
    mainPage.elements.bookCalender().should("be.visible");
    mainPage.buttons.calendarBookButton().should("have.text", "Book");
    mainPage.buttons.calendarCancelButton().should("have.text", "Cancel");
    mainPage.fillBookingForm(firstName, lastName, email, phone);
    cy.intercept("POST", "/booking/").as("bookRequest");

    mainPage.buttons.calendarBookButton().click();
    cy.wait("@bookRequest").then((interceptedRequest) => {
      expect(interceptedRequest.response.statusCode).to.eq(400);
    });
  });
});
