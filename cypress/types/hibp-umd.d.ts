// Augment the Window interface so we can use cy.window().its('hibp.breach')
// (for example) in tests.

interface Window {
  hibp: object;
  'hibp.breach': () => any;
  'hibp.breachedAccount': () => any;
  'hibp.breaches': () => any;
  'hibp.dataClasses': () => any;
  'hibp.pasteAccount': () => any;
  'hibp.pwnedPassword': () => any;
  'hibp.pwnedPasswordRange': () => any;
  'hibp.search': () => any;
}
