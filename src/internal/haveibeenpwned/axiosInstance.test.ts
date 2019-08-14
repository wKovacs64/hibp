jest.unmock('axios');

describe('internal (haveibeenpwned): axiosInstance', () => {
  it('only sets a User-Agent request header when outside the browser', () => {
    const originalNavigator = global.navigator;

    // Node
    global.navigator = undefined;
    const axiosInstanceNode = require.requireActual('./axiosInstance').default;
    expect(Object.keys(axiosInstanceNode.defaults.headers)).toContain(
      'User-Agent',
    );
    expect(axiosInstanceNode.defaults.headers['User-Agent']).toBeTruthy();

    jest.resetModules();

    // Browser
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    global.navigator = {} as Navigator;
    const axiosInstanceBrowser = require.requireActual('./axiosInstance')
      .default;
    expect(Object.keys(axiosInstanceBrowser.defaults.headers)).not.toContain(
      'User-Agent',
    );

    global.navigator = originalNavigator;
  });
});
