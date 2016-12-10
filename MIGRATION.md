## Migration Notes

#### 3.0.0 → 4.0.0

* Support for Node.js versions less than 4.x has been dropped. It will probably
  still work (at least for the foreseeable future), but I'm not going out of my
  way to make sure. If you are leveraging this library in such an environment,
  you should restrict the version in your dependencies to `^3.0.0`.

#### 2.2.0 → 3.0.0

* The browser (UMD) build output has moved from the `lib` directory to the
  `dist` directory to separate it from the server-side output. A development
  (non-minified) version is also now included, which was omitted in the past as
  it would have had the same file name in the same directory as the server-side
  output.

#### 1.0.8 → 2.0.0

* All API methods which previously resolved to `undefined` (upon receiving a
  `404 Not Found` response from the remote endpoint) now resolve to `null`
  instead. This may or may not be a breaking change, depending on how strictly
  you're handling the "no data found" return value. Loose truthy/falsey checks
  like `if (breachData) { ... }` will be fine, but strict equality checks like
  `if (breachData === undefined) { ... }` will break.

  ***N.B.*** *This is a philosophical change based on various sources regarding
  the difference between null and undefined in JavaScript. In the case where a
  query responds with no data, it is an expected absence of value, as that is
  how the remote API is documented to respond when there are no relevant objects
  to return.*

  [Ryan Morr](http://goo.gl/TGTS96):
  > To distinguish between the two, you may want to think of undefined as
  > representing an unexpected absence of value and null as representing an
  > expected absence of value."

  [MDN](https://goo.gl/n85RSe):
  > In APIs, null is often retrieved in place where an object can be expected
  > but no object is relevant.

* All API methods that previously took optional, positional parameters like
  `domain` and `truncateResults` now take an options object instead. For
  example:

  1.0.8 (old):
  ```javascript
  hibp.breachedAccount(account, 'adobe.com', true)
      .then(/* ... */);
  ```

  2.0.0 (new):
  ```javascript
  hibp.breachedAccount(account, {domain: 'adobe.com', truncate: true})
      .then(/* ... */);
  ```

  This change was made to make the API more expressive and reduce ambiguity. See
  the API documentation (or JSDoc comments) for details.
