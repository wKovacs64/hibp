import 'source-map-support/register';
import * as Axios from 'axios';

/**
 * An interface to the haveibeenpwned.com API (version 2).
 */
const hibp = {
  /**
   * The axios instance used for API queries. Not meant for general use.
   *
   * @private
   * @type {axios.AxiosInstance}
   */
  axios: Axios.create({
    baseURL: 'https://haveibeenpwned.com/api',
    headers: {
      'Accept': 'application/vnd.haveibeenpwned.v2+json'
    }
  }),

  /**
   * Fetches data from the supplied API endpoint.
   *
   * HTTP status code 200 returns an Object (data found).
   * HTTP status code 404 returns undefined (no data found).
   * HTTP status code 400 throws an Error (bad request).
   * HTTP status code 403 throws an Error (forbidden).
   *
   * @private
   * @param {string} endpoint the API endpoint to query
   * @returns {Promise} a Promise which resolves to the data resulting from the
   * query (or undefined for 404 Not Found responses), or rejects with an Error
   */
  fetchFromApi: (endpoint) => {
    const ERR400 = 'Bad request — the account does not comply with an ' +
        'acceptable format.';
    const ERR403 = 'Forbidden - no user agent has been specified in the ' +
        'request.';
    return Promise
        .resolve(hibp.axios.get(endpoint))
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          if (err.response) {
            switch (err.response.status) {
              case 400:
                throw new Error(ERR400);
              case 403:
                throw new Error(ERR403);
              case 404:
                return undefined;
            }
          } else {
            throw err;
          }
        });
  },

  /**
   * Fetches breach data for the specified account.
   *
   * @param {string} account a username or email address
   * @param {string} [domain] a domain by which to filter the results
   * @param {boolean} [truncateResults] truncate the results to only include the
   * name of each breach (default: false)
   * @returns {Promise} a Promise which resolves to an Object representing a
   * breach (or undefined if no breaches were found), or rejects with an Error
   */
  breachedAccount: (account, domain, truncateResults) => {
    let endpoint = `/breachedaccount/${account}`;
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
    return hibp.fetchFromApi(endpoint);
  },

  /**
   * Fetches all breached sites in the system.
   *
   * @param {string} [domain] a domain by which to filter the results
   * @returns {Promise} a Promise which resolves to an array of breach Objects
   * (an empty array if no breaches were found), or rejects with an Error
   */
  breaches: (domain) => {
    let endpoint = '/breaches';
    if (domain) {
      endpoint += `?domain=${domain}`;
    }
    return hibp.fetchFromApi(endpoint);
  },

  /**
   * Fetches breach data for a single site by breach name.
   *
   * @param {string} breachName the name of a breach in the system
   * @returns {Promise} a Promise which resolves to an Object representing a
   * breach (or undefined if no breach was found), or rejects with an Error
   */
  breach: (breachName) => {
    return hibp.fetchFromApi(`/breach/${breachName}`);
  },

  /**
   * Fetches all data classes in the system.
   *
   * @returns {Promise} a Promise which resolves to an array of strings (or
   * undefined if no data classes were found), or rejects with an Error
   */
  dataClasses: () => {
    return hibp.fetchFromApi('/dataclasses');
  },

  /**
   * Fetches all pastes for an account (email address).
   *
   * @param {string} email the email address to query
   * @returns {Promise} a Promise which resolves to an array of paste Objects
   * (or undefined if no pastes were found), or rejects with an Error
   */
  pasteAccount: (email) => {
    return hibp.fetchFromApi(`/pasteaccount/${email}`);
  }
};

export default hibp;
