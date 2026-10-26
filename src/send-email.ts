import { postToApi } from "./api/haveibeenpwned/post-to-api.js";
import type { EmailAlias } from "./api/haveibeenpwned/types.js";

/**
 * An administrative alias supported for domain verification emails.
 *
 * @typedef {("admin"|"hostmaster"|"info"|"security"|"webmaster")} EmailAlias
 */

/**
 * Requests a domain verification approval email.
 *
 * Requires an HIBP Pro subscription. Follow the link sent to the chosen alias
 * at the domain to complete verification.
 *
 * 🔑 `haveibeenpwned.com` requires an API key from
 * https://haveibeenpwned.com/API/Key for the `domainVerification/sendEmail`
 * endpoint. The `apiKey` option here is not explicitly required, but direct
 * requests made without it will fail (unless you specify a `baseUrl` to a proxy
 * that inserts a valid API key on your behalf).
 *
 * @see https://haveibeenpwned.com/API/v3#VerifyDomainViaEmail
 * @param {string} domain the domain to verify (e.g., "example.com")
 * @param {EmailAlias} emailAlias the administrative alias to
 * receive the email
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
 * @returns {Promise<void>} a Promise which resolves without parsing the
 * response body when the approval email request succeeds, or rejects with an
 * Error containing the upstream failure reason
 * @example
 * try {
 *   await sendEmail("example.com", "security", {
 *     apiKey: "my-api-key",
 *   });
 *   // Follow the link in the email sent to security@example.com.
 * } catch (err) {
 *   // ...
 * }
 */
export async function sendEmail(
  domain: string,
  emailAlias: EmailAlias,
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
): Promise<void> {
  await postToApi(
    "/domainVerification/sendEmail",
    { DomainName: domain, EmailAlias: emailAlias },
    options,
  );
}
