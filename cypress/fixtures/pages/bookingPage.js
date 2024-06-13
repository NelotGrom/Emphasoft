export class BookingPage {
  inputs = {
    messageNameField: () => cy.get("#name"), 
  };

  buttons = {
    bookRoomButton: (position) => cy.get(`.hotel-room-info:nth-child(${position}) >> .btn`),
  };

  elements = {
    errorGrowMessage: () => cy.get('.alert.alert-danger'),
  };

  bookRoomFromList(roomPositionNumInList) {
    this.buttons.bookRoomButton(roomPositionNumInList).click();
  }

  sendMessage(fullname, email, phone, subject, message) {
    this.inputs.messageNameField().type(fullname);
    this.inputs.messageEmailField().type(email);
    this.inputs.messagePhoneField().type(phone);
    this.inputs.messageSubjectField().type(subject);
    this.inputs.messagePayloadField().type(message);
    this.buttons.sendMessage().click();
  }
}
