// Add faux `navigator` to the `global` object as the vitest test environment is
// set to 'node' and therefore doesn't have `document`, `navigator`, or `window`
/** @internal */
declare namespace NodeJS {
  interface Global {
    // optional to allow for removing it to test absence
    navigator?: Navigator;
  }
}
