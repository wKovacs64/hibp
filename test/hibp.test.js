import { expect } from 'chai';
import * as hibp from '../src/hibp';

describe('hibp', () => {
  it('should export an object containing the advertised functions', () => {
    expect(hibp).to.be.an('object').and.have.all.keys([
      'breachedAccount',
      'breaches',
      'breach',
      'dataClasses',
      'pasteAccount',
      'pwnedPassword',
      'search',
    ]);
  });
});
