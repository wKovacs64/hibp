## Modules

<dl>
<dt><a href="#module_breach">breach</a></dt>
<dd><p>A module for retrieving data for a specific breach event.</p>
</dd>
<dt><a href="#module_breachedAccount">breachedAccount</a></dt>
<dd><p>A module for retrieving breach data for a specific account.</p>
</dd>
<dt><a href="#module_breaches">breaches</a></dt>
<dd><p>A module for retrieving all breach events in the system.</p>
</dd>
<dt><a href="#module_dataClasses">dataClasses</a></dt>
<dd><p>A module for retrieving all data classes in the system.</p>
</dd>
<dt><a href="#module_pasteAccount">pasteAccount</a></dt>
<dd><p>A module for retrieving paste data for a specific account (email address).</p>
</dd>
<dt><a href="#module_pwnedPassword">pwnedPassword</a></dt>
<dd><p>A module for securely determining how many times a password has been exposed
in a breach.</p>
</dd>
<dt><a href="#module_pwnedPasswordRange">pwnedPasswordRange</a></dt>
<dd><p>A module for determining if a password&#39;s SHA-1 hash has been exposed in a
breach.</p>
</dd>
<dt><a href="#module_search">search</a></dt>
<dd><p>A module for searching all breach and paste data associated with a specific
account (email address or username).</p>
</dd>
</dl>

## Objects

<dl>
<dt><a href="#hibp">hibp</a> : <code>object</code></dt>
<dd><p>A namespace containing all of the hibp functions.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#exp_module_breach--breach">breach(breachName)</a> ⇒ <code>Promise</code> ⏏</dt>
<dd><p>Fetches data for a specific breach event.</p>
</dd>
<dt><a href="#exp_module_breachedAccount--breachedAccount">breachedAccount(account, [options])</a> ⇒ <code>Promise</code> ⏏</dt>
<dd><p>Fetches breach data for a specific account.</p>
</dd>
<dt><a href="#exp_module_breaches--breaches">breaches([options])</a> ⇒ <code>Promise</code> ⏏</dt>
<dd><p>Fetches all breach events in the system.</p>
</dd>
<dt><a href="#exp_module_dataClasses--dataClasses">dataClasses()</a> ⇒ <code>Promise</code> ⏏</dt>
<dd><p>Fetches all data classes in the system.</p>
</dd>
<dt><a href="#exp_module_pasteAccount--pasteAccount">pasteAccount(email)</a> ⇒ <code>Promise</code> ⏏</dt>
<dd><p>Fetches paste data for a specific account (email address).</p>
</dd>
<dt><a href="#exp_module_pwnedPassword--pwnedPassword">pwnedPassword(password)</a> ⇒ <code>Promise</code> ⏏</dt>
<dd><p>Fetches the number of times the the given password has been exposed in a
breach (0 indicating no exposure). The password is given in plain text, but
only the first 5 characters of its SHA-1 hash will be submitted to the API.</p>
</dd>
<dt><a href="#exp_module_pwnedPasswordRange--pwnedPasswordRange">pwnedPasswordRange(prefix)</a> ⇒ <code>Promise</code> ⏏</dt>
<dd><p>Fetches the SHA-1 hash suffixes for the given 5-character SHA-1 hash prefix.</p>
<p>When a password hash with the same first 5 characters is found in the Pwned
Passwords repository, the API will respond with an HTTP 200 and include the
suffix of every hash beginning with the specified prefix, followed by a count
of how many times it appears in the data set. This function parses the
response and returns a more structured format.</p>
</dd>
<dt><a href="#exp_module_search--search">search(account, [breachOptions])</a> ⇒ <code>Promise</code> ⏏</dt>
<dd><p>Fetches all breaches and all pastes associated with the provided account
(email address or username). Note that the remote API does not support
querying pastes by username (only email addresses), so in the event the
provided account is not a valid email address, only breach data is queried
and the &quot;pastes&quot; field of the resulting object will always be null. This is
exactly how searching via the current web interface behaves, which this
convenience method is designed to mimic.</p>
</dd>
</dl>

<a name="module_breach"></a>

## breach
A module for retrieving data for a specific breach event.

**Example**  
```js
import { breach } from 'hibp';
```
<a name="exp_module_breach--breach"></a>

### breach(breachName) ⇒ <code>Promise</code> ⏏
Fetches data for a specific breach event.

**Kind**: global method of [<code>breach</code>](#module_breach)  
**Returns**: <code>Promise</code> - a Promise which resolves to an object representing a
breach (or null if no breach was found), or rejects with an Error  

| Param | Type | Description |
| --- | --- | --- |
| breachName | <code>string</code> | the name of a breach in the system |

**Example**  
```js
breach('Adobe')
  .then(data => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch(err => {
    // ...
  });
```
<a name="module_breachedAccount"></a>

## breachedAccount
A module for retrieving breach data for a specific account.

**Example**  
```js
import { breachedAccount } from 'hibp';
```
<a name="exp_module_breachedAccount--breachedAccount"></a>

### breachedAccount(account, [options]) ⇒ <code>Promise</code> ⏏
Fetches breach data for a specific account.

**Kind**: global method of [<code>breachedAccount</code>](#module_breachedAccount)  
**Returns**: <code>Promise</code> - a Promise which resolves to an array of breach objects
(or null if no breaches were found), or rejects with an Error  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | a username or email address |
| [options] | <code>Object</code> | a configuration object |
| [options.domain] | <code>string</code> | a domain by which to filter the results (default: all domains) |
| [options.truncate] | <code>boolean</code> | truncate the results to only include the name of each breach (default: false) |

**Example**  
```js
breachedAccount('foo')
  .then(data => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch(err => {
    // ...
  });
```
**Example**  
```js
breachedAccount('bar', { truncate: true })
  .then(data => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch(err => {
    // ...
  });
```
**Example**  
```js
breachedAccount('baz', { domain: 'adobe.com', truncate: true })
  .then(data => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch(err => {
    // ...
  });
```
<a name="module_breaches"></a>

## breaches
A module for retrieving all breach events in the system.

**Example**  
```js
import { breaches } from 'hibp';
```
<a name="exp_module_breaches--breaches"></a>

### breaches([options]) ⇒ <code>Promise</code> ⏏
Fetches all breach events in the system.

**Kind**: global method of [<code>breaches</code>](#module_breaches)  
**Returns**: <code>Promise</code> - a Promise which resolves to an array of breach objects
(an empty array if no breaches were found), or rejects with an Error  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | a configuration object |
| [options.domain] | <code>string</code> | a domain by which to filter the results (default: all domains) |

**Example**  
```js
breaches()
  .then(data => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch(err => {
    // ...
  });
```
**Example**  
```js
breaches({ domain: 'adobe.com' })
  .then(data => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch(err => {
    // ...
  });
```
<a name="module_dataClasses"></a>

## dataClasses
A module for retrieving all data classes in the system.

**Example**  
```js
import { dataClasses } from 'hibp';
```
<a name="exp_module_dataClasses--dataClasses"></a>

### dataClasses() ⇒ <code>Promise</code> ⏏
Fetches all data classes in the system.

**Kind**: global method of [<code>dataClasses</code>](#module_dataClasses)  
**Returns**: <code>Promise</code> - a Promise which resolves to an array of strings (or
null if no data classes were found), or rejects with an Error  
**Example**  
```js
dataClasses()
  .then(data => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch(err => {
    // ...
  });
```
<a name="module_pasteAccount"></a>

## pasteAccount
A module for retrieving paste data for a specific account (email address).

**Example**  
```js
import { pasteAccount } from 'hibp';
```
<a name="exp_module_pasteAccount--pasteAccount"></a>

### pasteAccount(email) ⇒ <code>Promise</code> ⏏
Fetches paste data for a specific account (email address).

**Kind**: global method of [<code>pasteAccount</code>](#module_pasteAccount)  
**Returns**: <code>Promise</code> - a Promise which resolves to an array of paste objects
(or null if no pastes were found), or rejects with an Error  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | the email address to query |

**Example**  
```js
pasteAccount('foo@bar.com')
  .then(data => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch(err => {
    // ...
  });
```
<a name="module_pwnedPassword"></a>

## pwnedPassword
A module for securely determining how many times a password has been exposed
in a breach.

**Example**  
```js
import { pwnedPassword } from 'hibp';
```
<a name="exp_module_pwnedPassword--pwnedPassword"></a>

### pwnedPassword(password) ⇒ <code>Promise</code> ⏏
Fetches the number of times the the given password has been exposed in a
breach (0 indicating no exposure). The password is given in plain text, but
only the first 5 characters of its SHA-1 hash will be submitted to the API.

**Kind**: global method of [<code>pwnedPassword</code>](#module_pwnedPassword)  
**Returns**: <code>Promise</code> - a Promise which resolves to the number of times the
password has been exposed in a breach, or rejects with an Error  
**See**: https://haveibeenpwned.com/API/v2#PwnedPasswords  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | a password in plain text |

**Example**  
```js
pwnedPassword('f00b4r')
  .then(numPwns => {
    // truthy check or numeric condition
    if (numPwns) {
      // ...
    } else {
      // ...
    }
  })
  .catch(err => {
    // ...
  });
```
<a name="module_pwnedPasswordRange"></a>

## pwnedPasswordRange
A module for determining if a password's SHA-1 hash has been exposed in a
breach.

**Example**  
```js
import { pwnedPasswordRange } from 'hibp';
```
<a name="exp_module_pwnedPasswordRange--pwnedPasswordRange"></a>

### pwnedPasswordRange(prefix) ⇒ <code>Promise</code> ⏏
Fetches the SHA-1 hash suffixes for the given 5-character SHA-1 hash prefix.

When a password hash with the same first 5 characters is found in the Pwned
Passwords repository, the API will respond with an HTTP 200 and include the
suffix of every hash beginning with the specified prefix, followed by a count
of how many times it appears in the data set. This function parses the
response and returns a more structured format.

**Kind**: global method of [<code>pwnedPasswordRange</code>](#module_pwnedPasswordRange)  
**Returns**: <code>Promise</code> - a Promise which resolves to an array of objects, each
containing the `suffix` that when matched with the prefix composes the
complete hash, and a `count` of how many times it appears in the breached
password data set, or rejects with an Error  
**See**: https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange  

| Param | Type | Description |
| --- | --- | --- |
| prefix | <code>string</code> | the first 5 characters of a SHA-1 password hash (case insensitive) |

**Example**  
```js
pwnedPasswordRange('5BAA6')
  .then(results => {
    // results will have the following shape:
    // [
    //   { suffix: "003D68EB55068C33ACE09247EE4C639306B", count: 3 },
    //   { suffix: "012C192B2F16F82EA0EB9EF18D9D539B0DD", count: 1 },
    //   ...
    // ]
  })
```
**Example**  
```js
const suffix = '1E4C9B93F3F0682250B6CF8331B7EE68FD8';
pwnedPasswordRange('5BAA6')
  // filter to matching suffix
  .then(results => results.filter(row => row.suffix === suffix))
  // return count if match, 0 if not
  .then(results => (results[0] ? results[0].count : 0))
  .catch(err => {
    // ...
  });
```
<a name="module_search"></a>

## search
A module for searching all breach and paste data associated with a specific
account (email address or username).

**Example**  
```js
import { search } from 'hibp';
```
<a name="exp_module_search--search"></a>

### search(account, [breachOptions]) ⇒ <code>Promise</code> ⏏
Fetches all breaches and all pastes associated with the provided account
(email address or username). Note that the remote API does not support
querying pastes by username (only email addresses), so in the event the
provided account is not a valid email address, only breach data is queried
and the "pastes" field of the resulting object will always be null. This is
exactly how searching via the current web interface behaves, which this
convenience method is designed to mimic.

**Kind**: global method of [<code>search</code>](#module_search)  
**Returns**: <code>Promise</code> - a Promise which resolves to an object containing a
"breaches" key (which can be null or an array of breach objects) and a
"pastes" key (which can be null or an array of paste objects), or rejects
with an Error  
**See**: https://haveibeenpwned.com/  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | an email address or username |
| [breachOptions] | <code>Object</code> | a configuration object pertaining to breach queries |
| [breachOptions.domain] | <code>string</code> | a domain by which to filter the results (default: all domains) |
| [breachOptions.truncate] | <code>boolean</code> | truncate the results to only include the name of each breach (default: false) |

**Example**  
```js
search('foo')
  .then(data => {
    if (data.breaches || data.pastes) {
      // ...
    } else {
      // ...
    }
  })
  .catch(err => {
    // ...
  });
```
**Example**  
```js
search('nobody@nowhere.com', { truncate: true })
  .then(data => {
    if (data.breaches || data.pastes) {
      // ...
    } else {
      // ...
    }
  })
  .catch(err => {
    // ...
  });
```
<a name="hibp"></a>

## hibp : <code>object</code>
A namespace containing all of the hibp functions.

**Kind**: global namespace  
**Example**  
```js
import * as hibp from 'hibp';
// Now all hibp functions are available on the hibp object:
hibp.dataClasses().then(...)
```
