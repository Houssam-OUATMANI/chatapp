/// <reference types="cypress" />

function typeAndSubmit() {
  cy.get(".form input").type("Hello World");
  cy.get(".form").submit();
  cy.get(".chat-box li div").contains("Hello World");
}

describe("Chatbox", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("displays chat an empty box ul", () => {
    cy.get(".chat-box").should("not.have.text");
    cy.get(".chat-box").should("not.have.descendants");
  });

  it(" should show a hello world message chat when submitting the form", () => {
    typeAndSubmit();
  });
  it(" should update the hello world message to Hi world ", () => {
    typeAndSubmit();
    cy.window().then((p) => {
      cy.stub(p, "prompt").returns("Hi world");
    });
    cy.get(".update-btn").click();
    cy.get(".chat-box li div").contains("Hi world");
  });
  it(" should delete the hello world message", () => {
    typeAndSubmit();
    cy.get(".delete-btn").click();
    cy.get(".chat-box li div").contains("Message supprimé 😥");
  });
});
