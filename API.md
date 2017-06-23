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
<dt><a href="#module_search">search</a></dt>
<dd><p>A module for searching all breach and paste data associated with a specific
account (email address or username).</p>
</dd>
</dl>

## Objects

<dl>
<dt><a href="#hibp">hibp</a> : <code>object</code></dt>
<dd><p>An object/namespace containing all the hibp functions.</p>
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
  .then((data) => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch((err) => {
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
  .then((data) => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch((err) => {
    // ...
  });
```
**Example**  
```js
breachedAccount('bar', { truncate: true })
  .then((data) => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch((err) => {
    // ...
  });
```
**Example**  
```js
breachedAccount('baz', { domain: 'adobe.com', truncate: true })
  .then((data) => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch((err) => {
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
  .then((data) => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch((err) => {
    // ...
  });
```
**Example**  
```js
breaches({ domain: 'adobe.com' })
  .then((data) => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch((err) => {
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
  .then((data) => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch((err) => {
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
  .then((data) => {
    if (data) {
      // ...
    } else {
      // ...
    }
  })
  .catch((err) => {
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
  .then((data) => {
    if (data.breaches || data.pastes) {
      // ...
    } else {
      // ...
    }
  })
  .catch((err) => {
    // ...
  });
```
**Example**  
```js
search('nobody@nowhere.com', { truncate: true })
  .then((data) => {
    if (data.breaches || data.pastes) {
      // ...
    } else {
      // ...
    }
  })
  .catch((err) => {
    // ...
  });
```
<a name="hibp"></a>

## hibp : <code>object</code>
An object/namespace containing all the hibp functions.

**Kind**: global namespace  
**Example**  
```js
import * as hibp from 'hibp';
// Now all hibp functions are available on the hibp object:
hibp.dataClasses().then(...)
```
