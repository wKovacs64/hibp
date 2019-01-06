// Reassign the jssha namespace to 'jssha/src/sha1' since we're importing that
// file directly to reduce bundle size. A custom `typeRoots` and an addition to
// the `types` array in tsconfig.json is also required.
declare module 'jssha/src/sha1' {
  import jssha from 'jssha';

  export default jssha;
}
