import * as hibp from './hibp';

describe('hibp', () => {
  it('exports an object containing the advertised functions', () => {
    expect(hibp).toMatchSnapshot();
  });
});
