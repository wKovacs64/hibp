import Axios from 'axios';
import { name, version } from '../../../package.json';

/**
 * An Axios instance used for API queries. Not meant for general use.
 *
 * @private
 */
export default Axios.create({
  baseURL: 'https://haveibeenpwned.com/api',
  headers: {
    Accept: 'application/vnd.haveibeenpwned.v2+json',
    // Add a custom User-Agent header when running outside the browser
    ...(typeof navigator === 'undefined' && {
      'User-Agent': `${name} ${version}`,
    }),
  },
});
