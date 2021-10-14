describe('User Onboarding', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  // Getters
  const nameInput = () => cy.get('input[name=name]');
  const emailInput = () => cy.get('input[name=email]');
  const passInput = () => cy.get('input[name=password]');
  const roleSelect = () => cy.get('select[name=role]');
  const tosInput = () => cy.get('input[name=tos]');
  const submitBtn = () => cy.get('button[type=submit]');

  // Sanity Checks
  it('sanity check to make sure tests work', () => {
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5);
    expect({}).not.to.equal({});
    expect({}).to.eql({});
  });

  it('Check to see if elements are in the DOM', () => {
    nameInput().should('exist');
    emailInput().should('exist');
    passInput().should('exist');
    roleSelect().should('exist');
    tosInput().should('exist');
    submitBtn().should('exist');
  });

  describe('Filling out the inputs and check submit button status', () => {
    // Submit Button should start out disabled
    it('submit button starts out disabled', () => {
      submitBtn().should('be.disabled');
    });

    // Type in the inputs
    it('can type in the inputs', () => {
      nameInput()
        .should('have.value', '')
        .type('Ethan Hunt')
        .should('have.value', 'Ethan Hunt');

      emailInput()
        .should('have.value', '')
        .type('ethan@mi.com')
        .should('have.value', 'ethan@mi.com');

      passInput()
        .should('have.value', '')
        .type('Verysecurypass444&')
        .should('have.value', 'Verysecurypass444&');
    });

    it('can check box and select dropdown option', () => {
      roleSelect()
        .should('have.value', '')
        .select('Project Manager')
        .should('have.value', 'Project Manager');

      tosInput().should('not.be.checked').check().should('be.checked');
    });

    // Submit button is enabled after filling out inputs and is added to the DOM
    it('Submit button is enabled when form criteria meets', () => {
      nameInput().type('Ethan Hunt');
      emailInput().type('ethan@mi.com');
      passInput().type('Verysecurypass444&');
      roleSelect().select('Project Manager');
      tosInput().check();
      submitBtn().should('be.enabled');
    });
  });

  describe('form data is submitted and is displayed on DOM', () => {
    it('Form Data can be submitted', () => {
      nameInput().type('Ethan Hunt');
      emailInput().type('ethan@mi.com');
      passInput().type('Verysecurypass444&');
      roleSelect().select('Project Manager');
      tosInput().check();
      submitBtn().should('be.enabled');
      submitBtn().click();
    });

    it('form data is displayed on DOM', () => {
      nameInput().type('Ethan Hunt');
      emailInput().type('ethan@mi.com');
      passInput().type('Verysecurypass444&');
      roleSelect().select('Project Manager');
      tosInput().check();
      submitBtn().should('be.enabled');
      submitBtn().click();
      cy.contains(/ethan hunt/i).should('exist');
      cy.contains('ethan@mi.com').should('exist');
      cy.contains('Verysecurypass444&').should('exist');
      cy.contains(/project manager/i).should('exist');
      cy.contains('✔️').should('exist');
    });
  });

  describe('form validation if input is left empty', () => {
    it('button disabled if empty name', () => {
      emailInput().type('bob@bob.com');
      passInput().type('Verysecurypass444');
      roleSelect().select('Project Manager');
      tosInput().check();
      submitBtn().should('be.disabled');
    });

    it('button disabled if empty email', () => {
      nameInput().type('Bob');
      passInput().type('Verysecurypass444');
      roleSelect().select('Project Manager');
      tosInput().check();
      submitBtn().should('be.disabled');
    });

    it('button disabled if empty password', () => {
      nameInput().type('Bob');
      emailInput().type('bob@bob.com');
      roleSelect().select('Project Manager');
      tosInput().check();
      submitBtn().should('be.disabled');
    });

    it('button disabled if role not selected', () => {
      nameInput().type('Bob');
      emailInput().type('bob@bob.com');
      passInput().type('Verysecurypass444');
      tosInput().check();
      submitBtn().should('be.disabled');
    });
  });
});
