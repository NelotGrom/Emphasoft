Cypress.Commands.add("getFreshCookies", () => {
    cy.getCookies()
      .should('exist')
      .then(cookies => {
        window.freshCookies = cookies;
        cookies.forEach(cookie => {
          cy.log(JSON.stringify(cookie));
        });
      });
  });
  