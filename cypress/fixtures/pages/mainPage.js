export class MainPage {
    inputs = {
       messageNameField: () => cy.get('#name'),
       messageEmailField: () => cy.get('#email'),
       messagePhoneField: () => cy.get('#phone'),
       messageSubjectField: () => cy.get('#subject'),
       messagePayloadField: () => cy.get('#description'),
    }

    buttons = {
        sendMessage: () => cy.get('#submitContact')
    }

    sendMessage(fullname,email,phone,subject,message) {
        this.inputs.messageNameField().type(fullname);
        this.inputs.messageEmailField().type(email);
        this.inputs.messagePhoneField().type(phone);
        this.inputs.messageSubjectField().type(subject);
        this.inputs.messagePayloadField().type(message);
        this.buttons.sendMessage().click();
    };
}
