import Axios from 'axios';
import { name, version } from '../../../package.json';

/**
 * An Axios instance used for API queries. Not meant for general use.
 *
 * @internal
 * @private
 */
export default Axios.create({
  baseURL: 'https://haveibeenpwned.com/api',
  headers: Object.assign(
    {
      Accept: 'application/vnd.haveibeenpwned.v2+json',
    },
    typeof navigator === 'undefined'
      ? {
          // Add a custom User-Agent header when running outside the browser
          'User-Agent': `${name} ${version}`,
        }
      : {},
  ),
});
