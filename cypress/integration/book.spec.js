const {generateName} = require("../fixtures/data");
const {mail, password} = require("../fixtures/login_data.json");

const description = "Книга";
const author = "Автор";

 it("Should successfuly login", () => {
    cy.contains('Books list');
    cy.login(mail, password);
    cy.contains('Добро пожаловать test@test.com').should("be.visible");
 });

 it("Should not login without email", () => {
    cy.login(" ", password);
    cy.contains('Log in').click();
    cy.get('#mail')
      .then($el => $el[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Please fill out this field.");
 });

  it("Should not login without password", () => {
    cy.login(mail, " ");
    cy.contains('Log in').click();
    cy.get('#mail').type(mail);
    cy.contains('Submit').click();
    cy.get('#pass')
      .then($el => $el[0].checkValidity())
      .should("be.false");
 });

 it("Should create new book", () => {
    const booksName = generateName(10);  
    cy.login(mail, password);
    cy.createBook(booksName, description, author);
    cy.contains(booksName);
 });

 it("Should add book in favorites", () => {
    const booksName = generateName(10);
    cy.login(mail, password);
    cy.createBook(booksName, description, author);
    cy.contains(booksName);
    cy.addToFavorites(booksName);
    cy.contains(booksName);
    cy.checkBookInFavorites(booksName);
 });


 it("Should delete book from favorites", () => {
    const booksName = generateName(10);  
    cy.login(mail, password);
    cy.createBook(booksName, description, author);
    cy.contains(booksName);
    cy.addToFavorite(booksName);  
    cy.deleteBookFromFavorites(booksName, "Favorites"); 
    cy.wait(3000);
    cy.contains(`${booksName}`).should('not.exist');
 });

