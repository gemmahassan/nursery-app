describe('Homepage', () => {
  it('visits Nursery Journal', () => {
    cy.visit('http://localhost:8081/');
  });
});

describe('Register', () => {
  it('visits the Register page', () => {
    cy.contains('Register').click();
    cy.url().should('include', '/contact');
  });

  it('enters text into the input fields ', () => {
    cy.get('#basic_name')
      .type('Kids Nursery')
      .should('have.value', 'Kids Nursery');
  });
});

describe('Login', () => {
  it('successfully logs in with valid credentials ', () => {
    cy.contains('Login').click();
    cy.get('#basic_username')
      .type('admin')
      .should('have.value', 'admin');

    cy.get('#basic_password')
      .type('admin123')
      .should('have.value', 'admin123');

    cy.get('#basic').submit();
    cy.url().should('include', '/dashboard');
  });

  it('does not log in with invalid credentials ', () => {
    cy.contains('Logout').click();
    cy.contains('Login').click();
    cy.get('#basic_username')
      .type('fake_user')
      .should('have.value', 'fake_user');

    cy.get('#basic_password')
      .type('fakepassword')
      .should('have.value', 'fakepassword');

    cy.get('#basic').submit();
    cy.contains('Incorrect username or password');pu
  });
})