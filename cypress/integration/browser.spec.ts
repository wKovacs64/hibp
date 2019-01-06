describe('UMD', () => {
  it('exposes the hibp namespace on the window object', () => {
    cy.visit('/test/umd.html');

    cy.window()
      .its('hibp')
      .should('be.an', 'object')
      .window()
      .its('hibp.breach')
      .should('be.a', 'function')
      .window()
      .its('hibp.breachedAccount')
      .should('be.a', 'function')
      .window()
      .its('hibp.breaches')
      .should('be.a', 'function')
      .window()
      .its('hibp.dataClasses')
      .should('be.a', 'function')
      .window()
      .its('hibp.pasteAccount')
      .should('be.a', 'function')
      .window()
      .its('hibp.pwnedPassword')
      .should('be.a', 'function')
      .window()
      .its('hibp.pwnedPasswordRange')
      .should('be.a', 'function')
      .window()
      .its('hibp.search')
      .should('be.a', 'function');
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
