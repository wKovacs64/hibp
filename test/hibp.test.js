import * as hibp from '../src/hibp';

describe('hibp', () => {
  it('should export an object containing the advertised functions', () => {
    expect(hibp).toMatchSnapshot();
  });
});
