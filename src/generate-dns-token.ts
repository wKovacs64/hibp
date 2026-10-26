import { postToApi } from "./api/haveibeenpwned/post-to-api.js";
import type { DnsToken } from "./api/haveibeenpwned/types.js";

/**
 * The TXT record value to publish at your DNS provider.
 *
 * @typedef {object} DnsToken
 * @property {string} txtRecordValue - the complete TXT record value
 */

/**
 * Generates a domain-specific DNS verification token.
 *
 * Publish `txtRecordValue` as a TXT record on the domain, then call
 * `verifyDnsToken` after DNS propagation.
 *
 * Requires a Pro API key from https://haveibeenpwned.com/API/Key. The `apiKey`
 * option here is not explicitly required, but direct requests made without it
 * will fail (unless you specify a `baseUrl` to a proxy that inserts a valid API
 * key on your behalf).
 *
 * @see https://haveibeenpwned.com/API/v3#VerifyDomainViaDns
 * @param {string} domain the domain to verify (e.g., "example.com")
 * @param {object} [options] a configuration object
 * @param {string} [options.apiKey] an API key from
 * https://haveibeenpwned.com/API/Key (default: undefined)
 * @param {string} [options.baseUrl] a custom base URL for the
 * haveibeenpwned.com API endpoints (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {number} [options.timeoutMs] timeout for the request in milliseconds
 * (default: none)
 * @param {AbortSignal} [options.signal] an AbortSignal to cancel the request (default: none)
 * @param {string} [options.userAgent] a custom string to send as the User-Agent
 * field in the request headers (default: `hibp <version>`)
 * @returns {Promise<DnsToken>} a Promise which resolves to the TXT record
 * value, or rejects with an Error containing the upstream failure reason
 * @example
 * try {
 *   const { txtRecordValue } = await generateDnsToken("example.com", {
 *     apiKey: "my-api-key",
 *   });
 *   // Publish txtRecordValue as a TXT record on example.com.
 * } catch (err) {
 *   // ...
 * }
 */
export async function generateDnsToken(
  domain: string,
  options: {
    /**
     * an API key from https://haveibeenpwned.com/API/Key (default: undefined)
     */
    apiKey?: string;
    /**
     * a custom base URL for the haveibeenpwned.com API endpoints (default:
     * `https://haveibeenpwned.com/api/v3`)
     */
    baseUrl?: string;
    /**
     * timeout for the request in milliseconds (default: none)
     */
    timeoutMs?: number;
    /**
     * an AbortSignal to cancel the request (default: none)
     */
    signal?: AbortSignal;
    /**
     * a custom string to send as the User-Agent field in the request headers
     * (default: `hibp <version>`)
     */
    userAgent?: string;
  } = {},
): Promise<DnsToken> {
  const response = await postToApi(
    "/domainVerification/generateDnsToken",
    { DomainName: domain },
    options,
  );
  return response.json() as Promise<DnsToken>;
}
