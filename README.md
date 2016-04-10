# hibp

*A Node.js module for querying [Troy Hunt](http://www.troyhunt.com/)'s
[Have I been pwned?](https://haveibeenpwned.com/) service.*

[![Build Status](https://travis-ci.org/wKovacs64/hibp.svg?branch=master)](https://travis-ci.org/wKovacs64/hibp)

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

##### Quick Start

###### Example (paste data for an email address):

```javascript
const hibp = require('hibp');

hibp.pasteAccount('foo@bar.com')
    .then(console.log)
    .catch(console.error);
```

###### Example (breach data for an account):

```javascript
var hibp = require('hibp');

hibp.breachedAccount('foo')
    .then(function (breachData) {
      if (breachData) {
        console.log('Bummer. ' + breachData.length + ' breach(es) found.');
      } else {
        console.log('Congratulations! No breaches associated with that account.');
      }
    })
    .catch(function (err) {
      console.error(err);
    });
```

##### Detailed Usage

For more in-depth usage information, see the [JSDoc comments](JSDOC.md).

##### Using in Node.js < 0.12

This module requires a Promise implementation to exist in the global namespace
prior to being loaded. Therefore, to facilitate use on versions of Node.js
before 0.12, you are responsible for providing a polyfill. I recommend
[es6-promise](https://github.com/stefanpenner/es6-promise).

###### Example:

```javascript
// This must be first!
require('es6-promise').polyfill();

var hibp = require('hibp');
```

## Projects Using hibp

* [pwned](https://github.com/wKovacs64/pwned) - a command-line tool for querying the 'Have I been pwned?' service

Send me a [PR](https://github.com/wKovacs64/hibp/pulls) or an email and I'll add yours to the list.

## License

This module is distributed under the [MIT License](LICENSE.txt).
