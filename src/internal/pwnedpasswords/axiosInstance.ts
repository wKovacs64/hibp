import Axios from 'axios';

/**
 * An Axios instance used for API queries. Not meant for general use.
 *
 * @internal
 * @private
 */
export default Axios.create({
  baseURL: 'https://api.pwnedpasswords.com',
});
