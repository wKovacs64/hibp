<a name="hibp"></a>

## hibp
An interface to the haveibeenpwned.com API (version 2).

**Kind**: global constant  

* [hibp](#hibp)
    * [.breachedAccount(account, [options])](#hibp.breachedAccount) ⇒ <code>Promise</code>
    * [.breaches([options])](#hibp.breaches) ⇒ <code>Promise</code>
    * [.breach(breachName)](#hibp.breach) ⇒ <code>Promise</code>
    * [.dataClasses()](#hibp.dataClasses) ⇒ <code>Promise</code>
    * [.pasteAccount(email)](#hibp.pasteAccount) ⇒ <code>Promise</code>
    * [.search(account, [breachOptions])](#hibp.search) ⇒ <code>Promise</code>

<a name="hibp.breachedAccount"></a>

### hibp.breachedAccount(account, [options]) ⇒ <code>Promise</code>
Fetches breach data for the specified account.

**Kind**: static method of [<code>hibp</code>](#hibp)  
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
hibp.breachedAccount('foo')
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
hibp.breachedAccount('bar', { truncate: true })
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
hibp.breachedAccount('baz', { domain: 'adobe.com', truncate: true })
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
<a name="hibp.breaches"></a>

### hibp.breaches([options]) ⇒ <code>Promise</code>
Fetches all breached sites in the system.

**Kind**: static method of [<code>hibp</code>](#hibp)  
**Returns**: <code>Promise</code> - a Promise which resolves to an array of breach objects
(an empty array if no breaches were found), or rejects with an Error  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | a configuration object |
| [options.domain] | <code>string</code> | a domain by which to filter the results (default: all domains) |

**Example**  
```js
hibp.breaches()
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
hibp.breaches({ domain: 'adobe.com' })
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
<a name="hibp.breach"></a>

### hibp.breach(breachName) ⇒ <code>Promise</code>
Fetches breach data for a single site by breach name.

**Kind**: static method of [<code>hibp</code>](#hibp)  
**Returns**: <code>Promise</code> - a Promise which resolves to an object representing a
breach (or null if no breach was found), or rejects with an Error  

| Param | Type | Description |
| --- | --- | --- |
| breachName | <code>string</code> | the name of a breach in the system |

**Example**  
```js
hibp.breach('Adobe')
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
<a name="hibp.dataClasses"></a>

### hibp.dataClasses() ⇒ <code>Promise</code>
Fetches all data classes in the system.

**Kind**: static method of [<code>hibp</code>](#hibp)  
**Returns**: <code>Promise</code> - a Promise which resolves to an array of strings (or
null if no data classes were found), or rejects with an Error  
**Example**  
```js
hibp.dataClasses()
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
<a name="hibp.pasteAccount"></a>

### hibp.pasteAccount(email) ⇒ <code>Promise</code>
Fetches all pastes for an account (email address).

**Kind**: static method of [<code>hibp</code>](#hibp)  
**Returns**: <code>Promise</code> - a Promise which resolves to an array of paste objects
(or null if no pastes were found), or rejects with an Error  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | the email address to query |

**Example**  
```js
hibp.pasteAccount('foo@bar.com')
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
<a name="hibp.search"></a>

### hibp.search(account, [breachOptions]) ⇒ <code>Promise</code>
Fetches all breaches and all pastes associated with the provided account
(an email address or username). Note that the remote API does not support
querying pastes by username (only email addresses), so in the event the
provided account is not a valid email address, only breach data is queried
and the "pastes" field of the resulting object will always be null. This is
exactly how searching via the current web interface behaves, which this
convenience method is designed to mimic.

**Kind**: static method of [<code>hibp</code>](#hibp)  
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
hibp.search('foo')
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
hibp.search('nobody@nowhere.com', { truncate: true })
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
