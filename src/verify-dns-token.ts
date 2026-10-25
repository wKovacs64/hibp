import { postToApi } from "./api/haveibeenpwned/post-to-api.js";

/**
 * Verifies a domain's published HIBP TXT record.
 *
 * Requires an HIBP Pro subscription. Generate the value with `generateDnsToken`,
 * publish it at your DNS provider, and allow time for DNS propagation first.
 * The record can be removed after verification succeeds.
 * Successful verification does not require parsing a response body.
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
 * @returns {Promise<void>} resolves on successful verification without parsing
 * a response body; rejects with an Error containing the upstream failure reason
 * @example
 * await verifyDnsToken("example.com", { apiKey: "my-pro-api-key" });
 */
export async function verifyDnsToken(
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
): Promise<void> {
  await postToApi(
    "/domainVerification/verifyDnsToken",
    { DomainName: domain },
    options,
  );
}
