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
 * Requires an HIBP Pro subscription. Publish `txtRecordValue` as a TXT record
 * on the domain, then call `verifyDnsToken` after DNS propagation.
 * Authenticated response details are documentation-derived, not live verified.
 *
 * @see https://haveibeenpwned.com/API/v3#VerifyDomainViaDns
 * @param {string} domain the domain to verify (e.g., "example.com")
 * @param {object} [options] a configuration object
 * @param {string} [options.apiKey] an HIBP Pro API key; optional when a proxy
 * supplies authentication
 * @param {string} [options.baseUrl] a custom API base URL (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {number} [options.timeoutMs] timeout in milliseconds (default: none)
 * @param {AbortSignal} [options.signal] an AbortSignal to cancel the request
 * @param {string} [options.userAgent] a custom User-Agent (default: `hibp <version>`)
 * @returns {Promise<DnsToken>} the documented TXT record value; rejects with an
 * Error containing the upstream failure reason
 * @example
 * const { txtRecordValue } = await generateDnsToken("example.com", {
 *   apiKey: "my-pro-api-key",
 * });
 * // Publish txtRecordValue as a TXT record on example.com at your DNS provider.
 */
export async function generateDnsToken(
  domain: string,
  options: {
    /** An HIBP Pro API key; optional when a proxy supplies authentication. */
    apiKey?: string;
    /** A custom API base URL (default: `https://haveibeenpwned.com/api/v3`). */
    baseUrl?: string;
    /** Timeout in milliseconds (default: none). */
    timeoutMs?: number;
    /** An AbortSignal to cancel the request. */
    signal?: AbortSignal;
    /** A custom User-Agent (default: `hibp <version>`). */
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
