// TODO: remove temporary workaround for bradzacher/eslint-plugin-typescript#255
/* eslint-disable strict */

describe('UMD', () => {
  it('exposes the hibp namespace on the window object', () => {
    cy.visit('/test/umd.html');

    cy.window()
      .its('hibp')
      .then(hibp => {
        expect(hibp.breach).to.be.a('function');
        expect(hibp.breachedAccount).to.be.a('function');
        expect(hibp.breaches).to.be.a('function');
        expect(hibp.dataClasses).to.be.a('function');
        expect(hibp.pasteAccount).to.be.a('function');
        expect(hibp.pwnedPassword).to.be.a('function');
        expect(hibp.pwnedPasswordRange).to.be.a('function');
        expect(hibp.search).to.be.a('function');
      });
  });
});

describe('ESM for browsers', () => {
  it('exports the hibp namespace', () => {
    cy.visit('/test/esm.html');

    // N.B. Some assertions are on the page itself (in the <script> block). If
    // any of them fail, they will throw an error and prevent the final line of
    // the script from setting the results message, causing the test to fail.

    cy.get('#results').should('have.text', 'success');
  });
});
