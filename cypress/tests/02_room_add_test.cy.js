import { faker } from "@faker-js/faker";
import { MainPage } from "../fixtures/pages/mainPage.js";
import { AdminPage } from "../fixtures/pages/adminPage.js";

const creds = require("../fixtures/creds.json");
const testData = require("../fixtures/testData.json");

const mainPage = new MainPage();
const adminPage = new AdminPage();
const arrRoomTypes = testData.roomTypes;

describe("Verify room adding with the admin page", () => {
  const roomName = faker.string.uuid();
  const roomPrice = faker.number.int({ min: 1, max: 999 });
  let initialRooms;
  let updatedRooms;

  it("Adding a room with all options", () => {
    cy.intercept("GET", "/room").as("getAllRooms");
    cy.intercept("POST", "/room").as("createRoom");

    adminPage.getAdminPageAccessAPI(creds.adminLogin, creds.adminPassword);
    cy.wait("@getAllRooms").then((interceptedRequest) => {
      initialRooms = interceptedRequest.response.body.rooms;
    });

    // Verify default values
    adminPage.lists.typesOfRoom().should("have.value", "Single");
    adminPage.lists.accessibleNow().should("have.value", "false");

    adminPage.fillInput("roomNameField", roomName);

    // Verify each room type
    arrRoomTypes.forEach((type) => {
      adminPage.lists.typesOfRoom().select(type).should("have.value", type);
    });

    // Select all optins
    adminPage.dropdownOptionSelect("accessibleNow", "true");
    adminPage.fillInput("roomPriceField", roomPrice);
    adminPage.checkboxOptionSelect("wifiCheckbox");
    adminPage.checkboxOptionSelect("tvCheckbox");
    adminPage.checkboxOptionSelect("radioCheckbox");
    adminPage.checkboxOptionSelect("refreshCheckbox");
    adminPage.checkboxOptionSelect("safeCheckbox");
    adminPage.checkboxOptionSelect("viewsCheckbox");
    adminPage.buttons.createRoom().should("have.text", "Create").click();

    // Wait for POST room to server
    cy.wait("@createRoom").then((request) => {
      expect(request.response.statusCode).to.eq(201);
      const responseBody = request.response.body;
      expect(responseBody).to.have.property("accessible", true);
      expect(responseBody).to.have.property("roomName", roomName);
      expect(responseBody).to.have.property("roomPrice", roomPrice);
      expect(responseBody).to.have.property("type", arrRoomTypes.at(-1));
      expect(responseBody.features).to.include.members([
        "WiFi",
        "TV",
        "Radio",
        "Refreshments",
        "Safe",
        "Views",
      ]);
    });

    // Wait for GET room with updated list of rooms
    cy.wait("@getAllRooms").then((interceptedRequest) => {
      updatedRooms = interceptedRequest.response.body.rooms;
      expect(initialRooms.length + 1 === updatedRooms.length).to.be.true;
      const createdRoom = updatedRooms.find(
        (room) => room.roomName === roomName
      );
      expect(createdRoom).to.have.property("type", arrRoomTypes.at(-1));
      expect(createdRoom).to.have.property("roomPrice", roomPrice);
      expect(createdRoom).to.have.property("accessible", true);
      expect(createdRoom.features).to.include.members([
        "WiFi",
        "TV",
        "Radio",
        "Refreshments",
        "Safe",
        "Views",
      ]);
    });

    adminPage.elements
      .lastRoomInList()
      .should(
        "have.text",
        roomName +
          arrRoomTypes.at(-1) +
          true +
          roomPrice +
          "WiFi," +
          " TV," +
          " Radio," +
          " Refreshments," +
          " Safe," +
          " Views"
      );

    // Verify created room on the main page
    cy.visit("/");
    mainPage.elements.lastCreatedRoom().should("be.visible");
    mainPage.elements
      .lastCreatedRoom()
      .find(".img-responsive.hotel-img")
      .should("have.attr", "alt", `Preview image of room${roomName}`);
    mainPage.elements.lastCreatedRoom().contains(`${arrRoomTypes.at(-1)}`);
    mainPage.elements.lastCreatedRoom().contains("WiFi");
    mainPage.elements.lastCreatedRoom().contains("TV");
    mainPage.elements.lastCreatedRoom().contains("Radio");
    mainPage.elements.lastCreatedRoom().contains("Refreshments");
    mainPage.elements.lastCreatedRoom().contains("Safe");
    mainPage.elements.lastCreatedRoom().contains("Views");
  });

  it('Verify room adding with negative price', () => {
    adminPage.getAdminPageAccessAPI(creds.adminLogin, creds.adminPassword);
    cy.intercept("POST", "/room").as("createRoom");
    adminPage.fillInput("roomNameField", faker.number.int({ min: 1, max: 999 }+'Test'));
    adminPage.fillInput("roomPriceField", -roomPrice);
    adminPage.buttons.createRoom().should("have.text", "Create").click();
    cy.wait("@createRoom").then((request) => {
      expect(request.response.statusCode).to.eq(400);
    })
    adminPage.elements.errorGrowMessage().should('be.visible');
    adminPage.elements.errorGrowMessage().contains('должно быть не меньше 1');
    adminPage.elements.lastRoomInList().should("have.not.text", -roomPrice);  
     
  });
});
