import Axios from 'axios';
import { name, version } from '../../../package.json';

// Add a custom User-Agent header when running outside the browser
const customUserAgent =
  typeof navigator === 'undefined' ? `${name} ${version}` : undefined;

/**
 * An Axios instance used for API queries. Not meant for general use.
 *
 * @private
 */
export default Axios.create({
  baseURL: 'https://haveibeenpwned.com/api',
  headers: {
    Accept: 'application/vnd.haveibeenpwned.v2+json',
    'User-Agent': customUserAgent,
  },
});
