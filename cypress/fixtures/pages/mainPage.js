export class MainPage {
  inputs = {
    messageNameField: () => cy.get("#name"),
    messageEmailField: () => cy.get("#email"),
    messagePhoneField: () => cy.get("#phone"),
    messageSubjectField: () => cy.get("#subject"),
    messagePayloadField: () => cy.get("#description"),
    bookingFirstnameField: () => cy.get(".room-booking-form > .form-control"),
    bookingLastnameField: () =>
      cy.get(".col-sm-4 > :nth-child(2) > .form-control"),
    bookingEmailField: () =>
      cy.get(".col-sm-4 > :nth-child(3) > .form-control"),
    bookingPhoneField: () =>
      cy.get(".col-sm-4 > :nth-child(4) > .form-control"),
  };

  buttons = {
    sendMessage: () => cy.get("#submitContact"),
    bookRoomButton: (position) =>
      cy.get(`:nth-child(${position + 3}) > :nth-child(1) .btn`),
    calendarBookButton: () =>
      cy.get(":nth-child(4) > :nth-child(1) .btn:nth-child(6)"),
    calendarCancelButton: () =>
      cy.get(":nth-child(4) > :nth-child(1) .btn:nth-child(5)"),
  };

  elements = {
    bookCalender: () => cy.get(".rbc-calendar"),
    lastCreatedRoom: () => cy.get(".hotel-room-info:last"),
    errorGrowMessage: () => cy.get(".alert.alert-danger"),
  };

  bookRoomFromList(roomPositionNumInList) {
    this.buttons.bookRoomButton(roomPositionNumInList).click();
  }

  fillBookingForm(firstName, lastName, email, phone) {
    this.inputs.bookingFirstnameField().type(firstName);
    this.inputs.bookingLastnameField().type(lastName);
    this.inputs.bookingEmailField().type(email);
    this.inputs.bookingPhoneField().type(phone);
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
