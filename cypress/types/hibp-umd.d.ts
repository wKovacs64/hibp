// Augment the Window interface so we can use cy.window().its('hibp' in tests.

interface HIBP {
  breach: () => any;
  breachedAccount: () => any;
  breaches: () => any;
  dataClasses: () => any;
  pasteAccount: () => any;
  pwnedPassword: () => any;
  pwnedPasswordRange: () => any;
  search: () => any;
}

interface Window {
  hibp: HIBP;
}
