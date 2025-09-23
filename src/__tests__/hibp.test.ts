import { describe, it, expect } from 'vitest';
import * as hibp from '../hibp.js';

describe('hibp', () => {
  it('exports an object containing the advertised functions', () => {
    expect(hibp).toMatchInlineSnapshot(`
      {
        "RateLimitError": [Function],
        "breach": [Function],
        "breachedAccount": [Function],
        "breaches": [Function],
        "dataClasses": [Function],
        "latestBreach": [Function],
        "pasteAccount": [Function],
        "pwnedPassword": [Function],
        "pwnedPasswordRange": [Function],
        "search": [Function],
        "subscriptionStatus": [Function],
      }
    `);
  });
});
