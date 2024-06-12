import { faker } from "@faker-js/faker";
import { MainPage } from "../fixtures/pages/mainPage.js";
import { AdminPage } from "../fixtures/pages/adminPage.js";

const creds = require("../fixtures/creds.json");

const mainPage = new MainPage();
const adminPage = new AdminPage();

describe("Verify room adding with the admin page", () => {
  it("Adding a room with all options", () => {
    adminPage.getAdminPageAccessAPI(creds.adminLogin, creds.adminPassword);    
  })
})