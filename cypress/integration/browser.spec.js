describe('UMD', () => {
  it('exposes the hibp namespace on the window object', () => {
    cy.visit('/test/umd.html');

    cy.window().then(win => {
      expect(win.hibp).to.be.an('object');
      expect(win.hibp.breach).to.be.a('function');
      expect(win.hibp.breach).to.be.a('function');
      expect(win.hibp.breachedAccount).to.be.a('function');
      expect(win.hibp.breaches).to.be.a('function');
      expect(win.hibp.dataClasses).to.be.a('function');
      expect(win.hibp.pasteAccount).to.be.a('function');
      expect(win.hibp.pwnedPassword).to.be.a('function');
      expect(win.hibp.pwnedPasswordRange).to.be.a('function');
      expect(win.hibp.search).to.be.a('function');
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
