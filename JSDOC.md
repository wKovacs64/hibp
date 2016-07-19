<a name="HIBP"></a>

## HIBP
HIBP - an interface to the haveibeenpwned.com API (version 2).

**Kind**: global constant  

* [HIBP](#HIBP)
    * [.breachedAccount(account, [domain], [truncateResults])](#HIBP.breachedAccount) ⇒ <code>Promise</code>
    * [.breaches([domain])](#HIBP.breaches) ⇒ <code>Promise</code>
    * [.breach(breachName)](#HIBP.breach) ⇒ <code>Promise</code>
    * [.dataClasses()](#HIBP.dataClasses) ⇒ <code>Promise</code>
    * [.pasteAccount(email)](#HIBP.pasteAccount) ⇒ <code>Promise</code>

<a name="HIBP.breachedAccount"></a>

### HIBP.breachedAccount(account, [domain], [truncateResults]) ⇒ <code>Promise</code>
Fetches breach data for the specified account.

**Kind**: static method of <code>[HIBP](#HIBP)</code>  
**Returns**: <code>Promise</code> - a Promise which resolves to an Object representing a
breach or resolves to undefined if no breaches were found  

| Param | Type | Description |
| --- | --- | --- |
| account | <code>string</code> | a username or email address |
| [domain] | <code>string</code> | a domain by which to filter the results |
| [truncateResults] | <code>boolean</code> | truncate the results to only include the name of each breach (default: false) |

<a name="HIBP.breaches"></a>

### HIBP.breaches([domain]) ⇒ <code>Promise</code>
Fetches all breached sites in the system.

**Kind**: static method of <code>[HIBP](#HIBP)</code>  
**Returns**: <code>Promise</code> - a Promise which resolves to an array of breach Objects
(an empty array if no breaches were found)

| Param | Type | Description |
| --- | --- | --- |
| [domain] | <code>string</code> | a domain by which to filter the results |

<a name="HIBP.breach"></a>

### HIBP.breach(breachName) ⇒ <code>Promise</code>
Fetches breach data for a single site by breach name.

**Kind**: static method of <code>[HIBP](#HIBP)</code>  
**Returns**: <code>Promise</code> - a Promise which resolves to an Object representing a
breach or resolves to undefined if no breaches were found  

| Param | Type | Description |
| --- | --- | --- |
| breachName | <code>string</code> | the name of a breach in the system |

<a name="HIBP.dataClasses"></a>

### HIBP.dataClasses() ⇒ <code>Promise</code>
Fetches all data classes in the system.

**Kind**: static method of <code>[HIBP](#HIBP)</code>  
**Returns**: <code>Promise</code> - a Promise which resolves to an array of strings or
resolves to undefined if no data classes were found  
<a name="HIBP.pasteAccount"></a>

### HIBP.pasteAccount(email) ⇒ <code>Promise</code>
Fetches all pastes for an account (email address).

**Kind**: static method of <code>[HIBP](#HIBP)</code>  
**Returns**: <code>Promise</code> - a Promise which resolves to an array of paste Objects or
resolves to undefined if no pastes were found  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | the email address to query |
