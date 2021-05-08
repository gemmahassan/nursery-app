describe('Homepage', () => {
  it('visits Nursery Journal', () => {
    cy.visit('http://localhost:8081/');
  });
});

describe('Register', () => {
  it('vists the Register page', function () {
    cy.contains('Register').click();
    cy.url().should('include', '/contact');
  });

  it('enters text into the input fields ', function () {
    cy.get('#basic_name')
      .type('Kids Nursery')
      .should('have.value', 'Kids Nursery');
  });
});