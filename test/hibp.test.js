import * as hibp from '../src/hibp';

describe('hibp', () => {
  it('should export an object containing the advertised functions', () => {
    expect(hibp).toEqual(
      expect.objectContaining({
        breachedAccount: expect.any(Function),
        breaches: expect.any(Function),
        breach: expect.any(Function),
        dataClasses: expect.any(Function),
        pasteAccount: expect.any(Function),
        pwnedPassword: expect.any(Function),
        search: expect.any(Function),
      }),
    );
  });
});
