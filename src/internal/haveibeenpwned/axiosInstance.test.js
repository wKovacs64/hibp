jest.unmock('axios');

describe('internal (haveibeenpwned): axiosInstance', () => {
  it('only sets a User-Agent request header when outside the browser', () => {
    const originalNavigator = global.navigator;

    // Node
    global.navigator = undefined;
    const axiosInstanceNode = require.requireActual('./axiosInstance').default;
    expect(axiosInstanceNode.defaults.headers['User-Agent']).toBeTruthy();

    jest.resetModules();

    // Browser
    global.navigator = {};
    const axiosInstanceBrowser = require.requireActual('./axiosInstance')
      .default;
    expect(axiosInstanceBrowser.defaults.headers['User-Agent']).toBeUndefined();

    global.navigator = originalNavigator;
  });
});
