export class AdminPage {
  inputs = {
    roomNameField: () => cy.get("#roomName"),
    roomPriceField: () => cy.get("#roomPrice"),
  };

  buttons = {
    createRoom: () => cy.get("#createRoom"),
    wifiCheckbox: () => cy.get("#wifiCheckbox"),
    tvCheckbox: () => cy.get("#tvCheckbox"),
    radioCheckbox: () => cy.get("#radioCheckbox"),
    refreshCheckbox: () => cy.get("#refreshCheckbox"),
    safeCheckbox: () => cy.get("#safeCheckbox"),
    viewsCheckbox: () => cy.get("#viewsCheckbox"),
  };

  lists = {
    typesOfRoom: () => cy.get("#type"),
    accessibleNow: () => cy.get("#accessible"),
  };

  elements = {
    lastRoomInList: () => cy.get('[data-testid="roomlisting"]:last'),
  };

  checkboxOptionSelect(checkbox) {
    this.buttons[checkbox]().click();
  }

  dropdownOptionSelect(dropdownList, option) {
    this.lists[dropdownList]().select(option);
  }

  fillInput(inputField, text) {
    this.inputs[inputField]().type(text);
  }

  getAdminPageAccessAPI(login, password) {
    cy.request({
      method: "POST",
      url: `/auth/login`,
      body: { username: login, password: password },
    }).then((response) => {
      expect(response.status).to.eq(200);

      const tokenInArr = response.headers["set-cookie"].find((cookie) =>
        cookie.startsWith("token=")
      );
      const token = tokenInArr.split(";")[0].split("=")[1];
      cy.setCookie("token", token);
      cy.visit("#/admin");
    });
  }
}
