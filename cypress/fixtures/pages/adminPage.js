export class AdminPage {
  inputs = {
    messageNameField: () => cy.get("#name"),
  };

  buttons = {
    sendMessage: () => cy.get("#submitContact"),
  };

  sendMessage(fullname, email, phone, subject, message) {
    this.buttons.sendMessage().click();
  }

  getAdminPageAccessAPI(login,password) {
    cy.request({
      method: "POST",
      url: `/auth/login`,
      body: { username: login, password: password},
    }).then((response) => {
      expect(response.status).to.eq(200);

      const tokenCookie = response.headers["set-cookie"].find((cookie) =>
        cookie.startsWith("token=")
      );
      const token = tokenCookie.split(";")[0].split("=")[1];
      cy.setCookie("token", token);
      cy.visit('#/admin');
    });
  }
}
