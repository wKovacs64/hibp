import * as hibp from '../hibp';

describe('hibp', () => {
  it('exports an object containing the advertised functions', () => {
    expect(hibp).toMatchInlineSnapshot(`
      {
        "breach": [Function],
        "breachedAccount": [Function],
        "breaches": [Function],
        "dataClasses": [Function],
        "pasteAccount": [Function],
        "pwnedPassword": [Function],
        "pwnedPasswordRange": [Function],
        "search": [Function],
        Symbol(Symbol.toStringTag): "Module",
      }
    `);
  });
});
