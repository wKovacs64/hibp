import Axios from 'axios';

/**
 * An Axios instance used for API queries. Not meant for general use.
 *
 * @private
 */
export default Axios.create({
  baseURL: 'https://haveibeenpwned.com/api',
  headers: {
    Accept: 'application/vnd.haveibeenpwned.v2+json',
  },
});
