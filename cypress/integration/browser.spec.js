describe('UMD', () => {
  it('exposes the hibp namespace on the window object', () => {
    cy.visit('/test/umd.html');

    cy.window().then(win => {
      expect(win.hibp).to.be.an('object');
      expect(win.hibp).to.have.all.keys(
        'breach',
        'breachedAccount',
        'breaches',
        'dataClasses',
        'pasteAccount',
        'pwnedPassword',
        'pwnedPasswordRange',
        'search',
      );
    });
  });
});

describe('ESM for browsers', () => {
  it('exports the hibp namespace', () => {
    cy.visit('/test/esm.html');
    // assertions are in the page itself
  });
});
