export interface Breach {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  ModifiedDate: string;
  PwnCount: number;
  Description: string;
  LogoPath: string;
  DataClasses: string[];
  IsVerified: boolean;
  IsFabricated: boolean;
  IsSensitive: boolean;
  IsRetired: boolean;
  IsSpamList: boolean;
}
export interface Paste {
  Id: string;
  Source: string;
  Title: string;
  Date: string;
  EmailCount: number;
}
/**
 * An object representing a breach.
 *
 * @typedef {object} Breach
 * @property {string} Name
 * @property {string} Title
 * @property {string} Domain
 * @property {string} BreachDate
 * @property {string} AddedDate
 * @property {string} ModifiedDate
 * @property {number} PwnCount
 * @property {string} Description
 * @property {string} LogoPath
 * @property {string[]} DataClasses
 * @property {boolean} IsVerified
 * @property {boolean} IsFabricated
 * @property {boolean} IsSensitive
 * @property {boolean} IsRetired
 * @property {boolean} IsSpamList
 */
/**
 * Fetches data for a specific breach event.
 *
 * @param {string} breachName the name of a breach in the system
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default: `https://haveibeenpwned.com/api`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<Breach>|Promise<null>)} a Promise which resolves to an
 * object representing a breach (or null if no breach was found), or rejects
 * with an Error
 * @example
 * breach('Adobe')
 *   .then(data => {
 *     if (data) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 * @alias module:breach
 */
export declare const breach: (
  breachName: string,
  options?: {
    baseUrl?: string | undefined;
    userAgent?: string | undefined;
  },
) => Promise<Breach | null>;
/**
 * Fetches breach data for a specific account.
 *
 * ***Warning:***
 *
 * As of January, 2019, `haveibeenpwned.com` has started blocking requests to
 * the `breachedaccount` endpoint when originating from within a browser (based
 * on the `User-Agent` field of the request headers). To use this function in a
 * browser, you will likely have to proxy your request through a server of your
 * own. The `baseUrl` option was added to facilitate this workaround.
 *
 * @param {string} account a username or email address
 * @param {object} [options] a configuration object
 * @param {string} [options.domain] a domain by which to filter the results
 * (default: all domains)
 * @param {boolean} [options.includeUnverified] include "unverified" breaches in
 * the results (by default, only verified breaches are included)
 * @param {boolean} [options.truncate] truncate the results to only include
 * the name of each breach (default: false)
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default: `https://haveibeenpwned.com/api`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<Breach[]> | Promise<null>)} a Promise which resolves to an
 * array of breach objects (or null if no breaches were found), or rejects with
 * an Error
 * @example
 * breachedAccount('foo')
 *   .then(data => {
 *     if (data) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 * @example
 * breachedAccount('bar', {
 *   includeUnverified: true,
 *   baseUrl: 'https://my-hibp-proxy:8080',
 * })
 *   .then(data => {
 *     if (data) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 * @example
 * breachedAccount('baz', {
 *   domain: 'adobe.com',
 *   truncate: true,
 *   userAgent: 'my-app 1.0'
 * })
 *   .then(data => {
 *     if (data) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 * @alias module:breachedAccount
 */
export declare const breachedAccount: (
  account: string,
  options?: {
    domain?: string | undefined;
    includeUnverified?: boolean | undefined;
    truncate?: boolean | undefined;
    baseUrl?: string | undefined;
    userAgent?: string | undefined;
  },
) => Promise<Breach[] | null>;
/**
 * Fetches all breach events in the system.
 *
 * @param {object} [options] a configuration object
 * @param {string} [options.domain] a domain by which to filter the results
 * (default: all domains)
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default: `https://haveibeenpwned.com/api`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {Promise<Breach[]>} a Promise which resolves to an array of breach
 * objects (an empty array if no breaches were found), or rejects with an Error
 * @example
 * breaches()
 *   .then(data => {
 *     if (data) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 * @example
 * breaches({ domain: 'adobe.com' })
 *   .then(data => {
 *     if (data) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 * @alias module:breaches
 */
export declare const breaches: (options?: {
  domain?: string | undefined;
  baseUrl?: string | undefined;
  userAgent?: string | undefined;
}) => Promise<Breach[]>;
/**
 * Fetches all data classes in the system.
 *
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default: `https://haveibeenpwned.com/api`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<string[]> | Promise<null>)} a Promise which resolves to an
 * array of strings (or null if no data classes were found), or rejects with an
 * Error
 * @example
 * dataClasses()
 *   .then(data => {
 *     if (data) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 * @alias module:dataClasses
 */
export declare const dataClasses: (options?: {
  baseUrl?: string | undefined;
  userAgent?: string | undefined;
}) => Promise<string[] | null>;
/**
 * An object representing a paste.
 *
 * @typedef {object} Paste
 * @property {string} Id
 * @property {string} Source
 * @property {string} Title
 * @property {string} Date
 * @property {number} EmailCount
 */
/**
 * Fetches paste data for a specific account (email address).
 *
 * @param {string} email the email address to query
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default: `https://haveibeenpwned.com/api`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {(Promise<Paste[]> | Promise<null>)} a Promise which resolves to an
 * array of paste objects (or null if no pastes were found), or rejects with an
 * Error
 * @example
 * pasteAccount('foo@bar.com')
 *   .then(data => {
 *     if (data) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 * @alias module:pasteAccount
 */
export declare const pasteAccount: (
  email: string,
  options?: {
    baseUrl?: string | undefined;
    userAgent?: string | undefined;
  },
) => Promise<Paste[] | null>;
/**
 * Fetches the number of times the the given password has been exposed in a
 * breach (0 indicating no exposure). The password is given in plain text, but
 * only the first 5 characters of its SHA-1 hash will be submitted to the API.
 *
 * @param {string} password a password in plain text
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * pwnedpasswords.com API endpoints (default: `https://api.pwnedpasswords.com`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {Promise<number>} a Promise which resolves to the number of times
 * the password has been exposed in a breach, or rejects with an Error
 * @example
 * pwnedPassword('f00b4r')
 *   .then(numPwns => {
 *     // truthy check or numeric condition
 *     if (numPwns) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 * @see https://haveibeenpwned.com/API/v2#PwnedPasswords
 * @alias module:pwnedPassword
 */
export declare const pwnedPassword: (
  password: string,
  options?: {
    baseUrl?: string | undefined;
    userAgent?: string | undefined;
  },
) => Promise<number>;
export interface PwnedPasswordSuffix {
  suffix: string;
  count: number;
}
/**
 * An object representing an exposed password hash suffix (corresponding to a
 * given hash prefix) and how many times it occurred in the Pwned Passwords
 * repository.
 *
 * @typedef {object} PwnedPasswordSuffix
 * @property {string} suffix
 * @property {number} count
 */
/**
 * Fetches the SHA-1 hash suffixes for the given 5-character SHA-1 hash prefix.
 *
 * When a password hash with the same first 5 characters is found in the Pwned
 * Passwords repository, the API will respond with an HTTP 200 and include the
 * suffix of every hash beginning with the specified prefix, followed by a count
 * of how many times it appears in the data set. This function parses the
 * response and returns a more structured format.
 *
 * @param {string} prefix the first 5 characters of a SHA-1 password hash (case
 * insensitive)
 * @param {object} [options] a configuration object
 * @param {string} [options.baseUrl] a custom base URL for the
 * pwnedpasswords.com API endpoints (default: `https://api.pwnedpasswords.com`)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {Promise<PwnedPasswordSuffix[]>} a Promise which resolves to an
 * array of objects, each containing the `suffix` that when matched with the
 * prefix composes the complete hash, and a `count` of how many times it appears
 * in the breached password data set, or rejects with an Error
 *
 * @example
 * pwnedPasswordRange('5BAA6')
 *   .then(results => {
 *     // results will have the following shape:
 *     // [
 *     //   { suffix: "003D68EB55068C33ACE09247EE4C639306B", count: 3 },
 *     //   { suffix: "012C192B2F16F82EA0EB9EF18D9D539B0DD", count: 1 },
 *     //   ...
 *     // ]
 *   })
 * @example
 * const suffix = '1E4C9B93F3F0682250B6CF8331B7EE68FD8';
 * pwnedPasswordRange('5BAA6')
 *   // filter to matching suffix
 *   .then(results => results.filter(row => row.suffix === suffix))
 *   // return count if match, 0 if not
 *   .then(results => (results[0] ? results[0].count : 0))
 *   .catch(err => {
 *     // ...
 *   });
 * @see https://haveibeenpwned.com/API/v2#SearchingPwnedPasswordsByRange
 * @alias module:pwnedPasswordRange
 */
export declare const pwnedPasswordRange: (
  prefix: string,
  options?: {
    baseUrl?: string | undefined;
    userAgent?: string | undefined;
  },
) => Promise<PwnedPasswordSuffix[]>;
export interface SearchResults {
  breaches: Breach[] | null;
  pastes: Paste[] | null;
}
/**
 * An object representing search results.
 *
 * @typedef {object} SearchResults
 * @property {(Breach[] | null)} breaches
 * @property {(Paste[] | null)} pastes
 */
/**
 * Fetches all breaches and all pastes associated with the provided account
 * (email address or username). Note that the remote API does not support
 * querying pastes by username (only email addresses), so in the event the
 * provided account is not a valid email address, only breach data is queried
 * and the "pastes" field of the resulting object will always be null. This is
 * exactly how searching via the current web interface behaves, which this
 * convenience method is designed to mimic.
 *
 * ***Warning:***
 *
 * As of January, 2019, `haveibeenpwned.com` has started blocking requests to
 * the `breachedaccount` endpoint when originating from within a browser (based
 * on the `User-Agent` field of the request headers). To use this function in a
 * browser, you will likely have to proxy your request through a server of your
 * own. The `baseUrl` option was added to facilitate this workaround.
 *
 * @param {string} account an email address or username
 * @param {object} [breachOptions] a configuration object
 * pertaining to breach queries
 * @param {string} [breachOptions.domain] a domain by which to filter the
 * results (default: all domains)
 * @param {boolean} [breachOptions.truncate] truncate the results to only
 * include the name of each breach (default: false)
 * @param {string} [breachOptions.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default: `https://haveibeenpwned.com/api`)
 * @param {string} [breachOptions.userAgent] a custom string to send as the
 * User-Agent field in the request headers (default: `hibp <version>`)
 * @returns {Promise<SearchResults>} a Promise which resolves to an object
 * containing a "breaches" key (which can be null or an array of breach objects)
 * and a "pastes" key (which can be null or an array of paste objects), or
 * rejects with an Error
 * @example
 * search('foo')
 *   .then(data => {
 *     if (data.breaches || data.pastes) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 * @example
 * search('nobody@nowhere.com', { truncate: true })
 *   .then(data => {
 *     if (data.breaches || data.pastes) {
 *       // ...
 *     } else {
 *       // ...
 *     }
 *   })
 *   .catch(err => {
 *     // ...
 *   });
 *
 * @see https://haveibeenpwned.com/
 * @alias module:search
 */
export declare const search: (
  account: string,
  breachOptions?: {
    domain?: string | undefined;
    truncate?: boolean | undefined;
    baseUrl?: string | undefined;
    userAgent?: string | undefined;
  },
) => Promise<SearchResults>;
export interface HIBP {
  breach: typeof breach;
  breachedAccount: typeof breachedAccount;
  breaches: typeof breaches;
  dataClasses: typeof dataClasses;
  pasteAccount: typeof pasteAccount;
  pwnedPassword: typeof pwnedPassword;
  pwnedPasswordRange: typeof pwnedPasswordRange;
  search: typeof search;
}

export as namespace hibp;
