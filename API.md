## Functions

<dl>
<dt><a href="#breach">breach(breachName, [options])</a> ⇒ <code><a href="#breach--object">Promise.&lt;Breach&gt;</a></code> | <code>Promise.&lt;null&gt;</code></dt>
<dd><p>Fetches data for a specific breach event.</p>
</dd>
<dt><a href="#breachedAccount">breachedAccount(account, [options])</a> ⇒ <code><a href="#breach--object">Promise.&lt;Array.&lt;Breach&gt;&gt;</a></code> | <code>Promise.&lt;null&gt;</code></dt>
<dd><p>Fetches breach data for a specific account.</p>
<p><strong><em>Warning (July 18, 2019):</em></strong></p>
<p><code>haveibeenpwned.com</code> now requires an API key from
<a href="https://haveibeenpwned.com/API/Key">https://haveibeenpwned.com/API/Key</a> for the <code>breachedaccount</code> endpoint. The
<code>apiKey</code> option here is not explicitly required, but direct requests made
without it (that is, without specifying a <code>baseUrl</code> to a proxy that inserts a
valid API key on your behalf) will fail.</p>
</dd>
<dt><a href="#breaches">breaches([options])</a> ⇒ <code><a href="#breach--object">Promise.&lt;Array.&lt;Breach&gt;&gt;</a></code></dt>
<dd><p>Fetches all breach events in the system.</p>
</dd>
<dt><a href="#dataClasses">dataClasses([options])</a> ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> | <code>Promise.&lt;null&gt;</code></dt>
<dd><p>Fetches all data classes in the system.</p>
</dd>
<dt><a href="#pasteAccount">pasteAccount(email, [options])</a> ⇒ <code><a href="#paste--object">Promise.&lt;Array.&lt;Paste&gt;&gt;</a></code> | <code>Promise.&lt;null&gt;</code></dt>
<dd><p>Fetches paste data for a specific account (email address).</p>
<p><strong><em>Warning (July 18, 2019):</em></strong></p>
<p><code>haveibeenpwned.com</code> now requires an API key from
<a href="https://haveibeenpwned.com/API/Key">https://haveibeenpwned.com/API/Key</a> for the <code>pasteaccount</code> endpoint. The
<code>apiKey</code> option here is not explicitly required, but direct requests made
without it (that is, without specifying a <code>baseUrl</code> to a proxy that inserts a
valid API key on your behalf) will fail.</p>
</dd>
<dt><a href="#pwnedPassword">pwnedPassword(password, [options])</a> ⇒ <code>Promise.&lt;number&gt;</code></dt>
<dd><p>Fetches the number of times the the given password has been exposed in a
breach (0 indicating no exposure). The password is given in plain text, but
only the first 5 characters of its SHA-1 hash will be submitted to the API.</p>
</dd>
<dt><a href="#pwnedPasswordRange">pwnedPasswordRange(prefix, [options])</a> ⇒ <code><a href="#pwnedpasswordsuffix--object">Promise.&lt;Array.&lt;PwnedPasswordSuffix&gt;&gt;</a></code></dt>
<dd><p>Fetches the SHA-1 hash suffixes for the given 5-character SHA-1 hash prefix.</p>
<p>When a password hash with the same first 5 characters is found in the Pwned
Passwords repository, the API will respond with an HTTP 200 and include the
suffix of every hash beginning with the specified prefix, followed by a count
of how many times it appears in the data set. This function parses the
response and returns a more structured format.</p>
</dd>
<dt><a href="#search">search(account, [breachOptions])</a> ⇒ <code><a href="#SearchResults">Promise.&lt;SearchResults&gt;</a></code></dt>
<dd><p>Fetches all breaches and all pastes associated with the provided account
(email address or username). Note that the remote API does not support
querying pastes by username (only email addresses), so in the event the
provided account is not a valid email address, only breach data is queried
and the &quot;pastes&quot; field of the resulting object will always be null. This is
exactly how searching via the current web interface behaves, which this
convenience method is designed to mimic.</p>
<p><strong><em>Warning (July 18, 2019):</em></strong></p>
<p><code>haveibeenpwned.com</code> now requires an API key from
<a href="https://haveibeenpwned.com/API/Key">https://haveibeenpwned.com/API/Key</a> for the <code>breachedaccount</code> and
<code>pasteaccount</code> endpoints. The  <code>apiKey</code> option here is not explicitly
required, but direct requests made without it (that is, without specifying a
<code>baseUrl</code> to a proxy that inserts a valid API key on your behalf) will fail.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#breach--object">Breach</a> : <code>object</code></dt>
<dd><p>An object representing a breach.</p>
</dd>
<dt><a href="#Paste">Paste</a> : <code>object</code></dt>
<dd><p>An object representing a paste.</p>
</dd>
<dt><a href="#PwnedPasswordSuffix">PwnedPasswordSuffix</a> : <code>object</code></dt>
<dd><p>An object representing an exposed password hash suffix (corresponding to a
given hash prefix) and how many times it occurred in the Pwned Passwords
repository.</p>
</dd>
<dt><a href="#SearchResults">SearchResults</a> : <code>object</code></dt>
<dd><p>An object representing search results.</p>
</dd>
</dl>

<a name="breach"></a>

## breach(breachName, [options]) ⇒ [<code>Promise.&lt;Breach&gt;</code>](#breach--object) \| <code>Promise.&lt;null&gt;</code>
Fetches data for a specific breach event.

**Kind**: global function  
**Returns**: [<code>Promise.&lt;Breach&gt;</code>](#breach--object) \| <code>Promise.&lt;null&gt;</code> - a Promise which resolves to an
object representing a breach (or null if no breach was found), or rejects
with an Error  

| Param | Type | Description |
| --- | --- | --- |
| breachName | <code>string</code> | the name of a breach in the system |
| [options] | <code>object</code> | a configuration object |
| [options.baseUrl] | <code>string</code> | a custom base URL for the haveibeenpwned.com API endpoints (default: `https://haveibeenpwned.com/api/v3`) |
| [options.userAgent] | <code>string</code> | a custom string to send as the User-Agent field in the request headers (default: `hibp <version>`) |

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
<a name="breachedAccount"></a>

## breachedAccount(account, [options]) ⇒ <code><a href="#breach--object">Promise.&lt;Array.&lt;Breach&gt;&gt;</a></code> \| <code>Promise.&lt;null&gt;</code>
Fetches breach data for a specific account.

***Warning (July 18, 2019):***

`haveibeenpwned.com` now requires an API key from
https://haveibeenpwned.com/API/Key for the `breachedaccount` endpoint. The
`apiKey` option here is not explicitly required, but direct requests made
without it (that is, without specifying a `baseUrl` to a proxy that inserts a
valid API key on your behalf) will fail.

**Kind**: global function  
**Returns**: <code><a href="#breach--object">Promise.&lt;Array.&lt;Breach&gt;&gt;</a></code> \| <code>Promise.&lt;null&gt;</code> - a Promise which resolves to an
array of breach objects (or null if no breaches were found), or rejects with
an Error  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | a username or email address |
| [options] | <code>object</code> | a configuration object |
| [options.apiKey] | <code>string</code> | an API key from https://haveibeenpwned.com/API/Key (default: undefined) |
| [options.domain] | <code>string</code> | a domain by which to filter the results (default: all domains) |
| [options.includeUnverified] | <code>boolean</code> | include "unverified" breaches in the results (default: true) |
| [options.truncate] | <code>boolean</code> | truncate the results to only include the name of each breach (default: true) |
| [options.baseUrl] | <code>string</code> | a custom base URL for the haveibeenpwned.com API endpoints (default: `https://haveibeenpwned.com/api/v3`) |
| [options.userAgent] | <code>string</code> | a custom string to send as the User-Agent field in the request headers (default: `hibp <version>`) |

**Example**  
```js
breachedAccount('foo', { apiKey: 'my-api-key' })
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
breachedAccount('bar', {
  includeUnverified: false,
  baseUrl: 'https://my-hibp-proxy:8080',
})
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
breachedAccount('baz', {
  apiKey: 'my-api-key',
  domain: 'adobe.com',
  truncate: false,
  userAgent: 'my-app 1.0'
})
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
<a name="breaches"></a>

## breaches([options]) ⇒ <code><a href="#breach--object">Promise.&lt;Array.&lt;Breach&gt;&gt;</a></code>
Fetches all breach events in the system.

**Kind**: global function  
**Returns**: <code><a href="#breach--object">Promise.&lt;Array.&lt;Breach&gt;&gt;</a></code> - a Promise which resolves to an array of breach
objects (an empty array if no breaches were found), or rejects with an Error  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | a configuration object |
| [options.domain] | <code>string</code> | a domain by which to filter the results (default: all domains) |
| [options.baseUrl] | <code>string</code> | a custom base URL for the haveibeenpwned.com API endpoints (default: `https://haveibeenpwned.com/api/v3`) |
| [options.userAgent] | <code>string</code> | a custom string to send as the User-Agent field in the request headers (default: `hibp <version>`) |

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
<a name="dataClasses"></a>

## dataClasses([options]) ⇒ <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> \| <code>Promise.&lt;null&gt;</code>
Fetches all data classes in the system.

**Kind**: global function  
**Returns**: <code>Promise.&lt;Array.&lt;string&gt;&gt;</code> \| <code>Promise.&lt;null&gt;</code> - a Promise which resolves to an
array of strings (or null if no data classes were found), or rejects with an
Error  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | a configuration object |
| [options.baseUrl] | <code>string</code> | a custom base URL for the haveibeenpwned.com API endpoints (default: `https://haveibeenpwned.com/api/v3`) |
| [options.userAgent] | <code>string</code> | a custom string to send as the User-Agent field in the request headers (default: `hibp <version>`) |

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
<a name="pasteAccount"></a>

## pasteAccount(email, [options]) ⇒ <code><a href="#paste--object">Promise.&lt;Array.&lt;Paste&gt;&gt;</a></code> \| <code>Promise.&lt;null&gt;</code>
Fetches paste data for a specific account (email address).

***Warning (July 18, 2019):***

`haveibeenpwned.com` now requires an API key from
https://haveibeenpwned.com/API/Key for the `pasteaccount` endpoint. The
`apiKey` option here is not explicitly required, but direct requests made
without it (that is, without specifying a `baseUrl` to a proxy that inserts a
valid API key on your behalf) will fail.

**Kind**: global function  
**Returns**: <code><a href="#paste--object">Promise.&lt;Array.&lt;Paste&gt;&gt;</a></code> \| <code>Promise.&lt;null&gt;</code> - a Promise which resolves to an
array of paste objects (or null if no pastes were found), or rejects with an
Error  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | the email address to query |
| [options] | <code>object</code> | a configuration object |
| [options.apiKey] | <code>string</code> | an API key from https://haveibeenpwned.com/API/Key |
| [options.baseUrl] | <code>string</code> | a custom base URL for the haveibeenpwned.com API endpoints (default: `https://haveibeenpwned.com/api/v3`) |
| [options.userAgent] | <code>string</code> | a custom string to send as the User-Agent field in the request headers (default: `hibp <version>`) |

**Example**  
```js
pasteAccount('foo@bar.com', { apiKey: 'my-api-key' })
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
<a name="pwnedPassword"></a>

## pwnedPassword(password, [options]) ⇒ <code>Promise.&lt;number&gt;</code>
Fetches the number of times the the given password has been exposed in a
breach (0 indicating no exposure). The password is given in plain text, but
only the first 5 characters of its SHA-1 hash will be submitted to the API.

**Kind**: global function  
**Returns**: <code>Promise.&lt;number&gt;</code> - a Promise which resolves to the number of times
the password has been exposed in a breach, or rejects with an Error  
**See**: https://haveibeenpwned.com/api/v3#PwnedPasswords  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>string</code> | a password in plain text |
| [options] | <code>object</code> | a configuration object |
| [options.baseUrl] | <code>string</code> | a custom base URL for the pwnedpasswords.com API endpoints (default: `https://api.pwnedpasswords.com`) |
| [options.userAgent] | <code>string</code> | a custom string to send as the User-Agent field in the request headers (default: `hibp <version>`) |

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
<a name="pwnedPasswordRange"></a>

## pwnedPasswordRange(prefix, [options]) ⇒ <code><a href="#pwnedpasswordsuffix--object">Promise.&lt;Array.&lt;PwnedPasswordSuffix&gt;&gt;</a></code>
Fetches the SHA-1 hash suffixes for the given 5-character SHA-1 hash prefix.

When a password hash with the same first 5 characters is found in the Pwned
Passwords repository, the API will respond with an HTTP 200 and include the
suffix of every hash beginning with the specified prefix, followed by a count
of how many times it appears in the data set. This function parses the
response and returns a more structured format.

**Kind**: global function  
**Returns**: <code><a href="#pwnedpasswordsuffix--object">Promise.&lt;Array.&lt;PwnedPasswordSuffix&gt;&gt;</a></code> - a Promise which resolves to an
array of objects, each containing the `suffix` that when matched with the
prefix composes the complete hash, and a `count` of how many times it appears
in the breached password data set, or rejects with an Error  
**See**: https://haveibeenpwned.com/api/v3#SearchingPwnedPasswordsByRange  

| Param | Type | Description |
| --- | --- | --- |
| prefix | <code>string</code> | the first 5 characters of a SHA-1 password hash (case insensitive) |
| [options] | <code>object</code> | a configuration object |
| [options.baseUrl] | <code>string</code> | a custom base URL for the pwnedpasswords.com API endpoints (default: `https://api.pwnedpasswords.com`) |
| [options.userAgent] | <code>string</code> | a custom string to send as the User-Agent field in the request headers (default: `hibp <version>`) |

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
<a name="search"></a>

## search(account, [breachOptions]) ⇒ [<code>Promise.&lt;SearchResults&gt;</code>](#SearchResults)
Fetches all breaches and all pastes associated with the provided account
(email address or username). Note that the remote API does not support
querying pastes by username (only email addresses), so in the event the
provided account is not a valid email address, only breach data is queried
and the "pastes" field of the resulting object will always be null. This is
exactly how searching via the current web interface behaves, which this
convenience method is designed to mimic.

***Warning (July 18, 2019):***

`haveibeenpwned.com` now requires an API key from
https://haveibeenpwned.com/API/Key for the `breachedaccount` and
`pasteaccount` endpoints. The  `apiKey` option here is not explicitly
required, but direct requests made without it (that is, without specifying a
`baseUrl` to a proxy that inserts a valid API key on your behalf) will fail.

**Kind**: global function  
**Returns**: [<code>Promise.&lt;SearchResults&gt;</code>](#SearchResults) - a Promise which resolves to an object
containing a "breaches" key (which can be null or an array of breach objects)
and a "pastes" key (which can be null or an array of paste objects), or
rejects with an Error  
**See**: https://haveibeenpwned.com/  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | an email address or username |
| [breachOptions] | <code>object</code> | a configuration object pertaining to breach queries |
| [breachOptions.apiKey] | <code>string</code> | an API key from https://haveibeenpwned.com/API/Key |
| [breachOptions.domain] | <code>string</code> | a domain by which to filter the results (default: all domains) |
| [breachOptions.truncate] | <code>boolean</code> | truncate the results to only include the name of each breach (default: true) |
| [breachOptions.baseUrl] | <code>string</code> | a custom base URL for the haveibeenpwned.com API endpoints (default: `https://haveibeenpwned.com/api/v3`) |
| [breachOptions.userAgent] | <code>string</code> | a custom string to send as the User-Agent field in the request headers (default: `hibp <version>`) |

**Example**  
```js
search('foo', { apiKey: 'my-api-key' })
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
search('nobody@nowhere.com', { apiKey: 'my-api-key', truncate: false })
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
<a name="Breach"></a>

## Breach : <code>object</code>
An object representing a breach.

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| Name | <code>string</code> | 
| Title | <code>string</code> | 
| Domain | <code>string</code> | 
| BreachDate | <code>string</code> | 
| AddedDate | <code>string</code> | 
| ModifiedDate | <code>string</code> | 
| PwnCount | <code>number</code> | 
| Description | <code>string</code> | 
| LogoPath | <code>string</code> | 
| DataClasses | <code>Array.&lt;string&gt;</code> | 
| IsVerified | <code>boolean</code> | 
| IsFabricated | <code>boolean</code> | 
| IsSensitive | <code>boolean</code> | 
| IsRetired | <code>boolean</code> | 
| IsSpamList | <code>boolean</code> | 

<a name="Paste"></a>

## Paste : <code>object</code>
An object representing a paste.

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| Id | <code>string</code> | 
| Source | <code>string</code> | 
| Title | <code>string</code> | 
| Date | <code>string</code> | 
| EmailCount | <code>number</code> | 

<a name="PwnedPasswordSuffix"></a>

## PwnedPasswordSuffix : <code>object</code>
An object representing an exposed password hash suffix (corresponding to a
given hash prefix) and how many times it occurred in the Pwned Passwords
repository.

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| suffix | <code>string</code> | 
| count | <code>number</code> | 

<a name="SearchResults"></a>

## SearchResults : <code>object</code>
An object representing search results.

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| breaches | [<code>Array.&lt;Breach&gt;</code>](#breach--object) \| <code>null</code> | 
| pastes | [<code>Array.&lt;Paste&gt;</code>](#Paste) \| <code>null</code> | 

