/* eslint valid-jsdoc: 2 */
'use strict';

// Enable source map support
require('source-map-support').install();

const pkg = require('../package.json');
const fetch = require('node-fetch');

const API_URL = 'https://haveibeenpwned.com/api';
const REQ_HEADERS = {
  'Accept': 'application/vnd.haveibeenpwned.v2+json',
  'User-Agent': `${pkg.name} ${pkg.version}`
};

/**
 * Fetches data from the supplied API endpoint.
 *
 * HTTP status code 200 returns an Object (data found).
 * HTTP status code 404 returns undefined (no data found).
 * HTTP status code 400 throws an Error (bad request).
 * HTTP status code 403 throws an Error (forbidden).
 *
 * @param {string} endpoint the API endpoint to query
 * @returns {Promise} the Promise for this Fetch
 */
function fetchFromApi (endpoint) {
  return fetch(endpoint, {headers: REQ_HEADERS})
      .then((res) => {
        if (res.ok) {
          return res.text();
        } else if (res.status === 400) {
          throw new Error('Bad request — the account does not comply with an' +
              ' acceptable format.');
        } else if (res.status === 403) {
          throw new Error('Forbidden - no user agent has been specified in' +
              ' the request');
        }
      })
      .then((body) => {
        return body ? JSON.parse(body) : undefined;
      });
}

/**
 * HIBP - an interface to the haveibeenpwned.com API (version 2).
 */
const HIBP = {
  /**
   * Fetches breach data for the specified account.
   *
   * @param {string} account a username or email address
   * @param {string} [domain] a domain by which to filter the results
   * @param {boolean} [truncateResults] truncate the results to only include the
   * name of each breach (default: false)
   * @returns {Promise} a Promise which resolves to an Object representing a
   * breach or resolves to undefined if no breaches were found
   */
  breachedAccount: (account, domain, truncateResults) => {
    return new Promise((resolve, reject) => {
      let endpoint = `${API_URL}/breachedaccount/${account}`;
      if (typeof domain === 'boolean') {
        truncateResults = domain;
        domain = undefined;
      }
      if (domain) {
        endpoint += `?domain=${domain}`;
        if (truncateResults) {
          endpoint += '&truncateResponse=true';
        }
      } else if (truncateResults) {
        endpoint += '?truncateResponse=true';
      }
      fetchFromApi(endpoint).then(resolve).catch(reject);
    });
  },

  /**
   * Fetches all breached sites in the system.
   *
   * @param {string} [domain] a domain by which to filter the results
   * @returns {Promise} a Promise which resolves to an array of breach Objects
   * or resolves to undefined if no breaches were found
   */
  breaches: (domain) => {
    return new Promise((resolve, reject) => {
      let endpoint = `${API_URL}/breaches`;
      if (domain) {
        endpoint += `?domain=${domain}`;
      }
      fetchFromApi(endpoint).then(resolve).catch(reject);
    });
  },

  /**
   * Fetches breach data for a single site by breach name.
   *
   * @param {string} breachName the name of a breach in the system
   * @returns {Promise} a Promise which resolves to an Object representing a
   * breach or resolves to undefined if no breaches were found
   */
  breach: (breachName) => {
    return new Promise((resolve, reject) => {
      let endpoint = `${API_URL}/breach/${breachName}`;
      fetchFromApi(endpoint).then(resolve).catch(reject);
    });
  },

  /**
   * Fetches all data classes in the system.
   *
   * @returns {Promise} a Promise which resolves to an array of strings or
   * resolves to undefined if no data classes were found
   */
  dataClasses: () => {
    return new Promise((resolve, reject) => {
      let endpoint = `${API_URL}/dataclasses`;
      fetchFromApi(endpoint).then(resolve).catch(reject);
    });
  },

  /**
   * Fetches all pastes for an account (email address).
   *
   * @param {string} email the email address to query
   * @returns {Promise} a Promise which resolves to an array of paste Objects or
   * resolves to undefined if no pastes were found
   */
  pasteAccount: (email) => {
    return new Promise((resolve, reject) => {
      let endpoint = `${API_URL}/pasteaccount/${email}`;
      fetchFromApi(endpoint).then(resolve).catch(reject);
    });
  }
};

// CommonJS
module.exports = HIBP;
// ES2015 default export compatibility
module.exports.default = HIBP;
