describe('User Onboarding', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
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
