import * as hibp from './hibp';

describe('hibp', () => {
  it('should export an object containing the advertised functions', () => {
    expect(hibp).toMatchSnapshot();
  });
});
