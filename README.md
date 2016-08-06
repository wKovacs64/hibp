# hibp

*A Promise-based API for querying [Troy Hunt](http://www.troyhunt.com/)'s
[Have I been pwned?](https://haveibeenpwned.com/) service.*

[![npm Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Code Coverage][coveralls-image]][coveralls-url]

## Installation

```shell
npm install --save hibp
```

## Features

* Get all breaches for an account
* Get all breached sites in the system
* Get a single breached site
* Get all data classes
* Get all pastes for an account
* All queries return a Promise

## Usage

##### Get all breaches for an account:

```javascript
import hibp from 'hibp';

hibp.breachedAccount('foo') // username or email
    .then(console.log)
    .catch(console.error);
```

##### Get all breached sites in the system:

```javascript
import hibp from 'hibp';

hibp.breaches()
    .then(console.log)
    .catch(console.error);
```

##### Get a single breached site:

```javascript
import hibp from 'hibp';

hibp.breach('Adobe')
    .then(console.log)
    .catch(console.error);
```

##### Get all data classes:

```javascript
import hibp from 'hibp';

hibp.dataClasses()
    .then(console.log)
    .catch(console.error);
```

##### Get all pastes for an account:

```javascript
import hibp from 'hibp';

hibp.pasteAccount('foo@bar.com') // email (not username)
    .then(console.log)
    .catch(console.error);
```

#### Detailed Usage

For in-depth usage information, see the [JSDoc comments](JSDOC.md).

#### Using in Node.js < 0.12

This module requires a Promise implementation to exist in the global namespace
prior to being loaded. Therefore, to facilitate use on versions of Node.js
before 0.12, you are responsible for providing a polyfill. I recommend
[es6-promise](https://github.com/stefanpenner/es6-promise).

##### Example:

```javascript
// This must be first!
require('es6-promise').polyfill();

var hibp = require('hibp');
```

## Projects Using hibp

* [pwned](https://github.com/wKovacs64/pwned) - a command-line tool for querying
  the 'Have I been pwned?' service

Send me a [PR](https://github.com/wKovacs64/hibp/pulls) or an email and I'll add
yours to the list.

## License

This module is distributed under the [MIT License](LICENSE.txt).

[npm-image]: https://img.shields.io/npm/v/hibp.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/hibp
[travis-image]: https://img.shields.io/travis/wKovacs64/hibp.svg?style=flat-square
[travis-url]: https://travis-ci.org/wKovacs64/hibp
[coveralls-image]: https://img.shields.io/coveralls/wKovacs64/hibp.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/wKovacs64/hibp
