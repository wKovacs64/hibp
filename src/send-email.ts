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
 * at the domain to complete verification. Success does not require parsing a
 * response body. Authenticated behavior and email delivery are not live verified.
 *
 * @see https://haveibeenpwned.com/API/v3#VerifyDomainViaEmail
 * @param {string} domain the domain to verify (e.g., "example.com")
 * @param {EmailAlias} emailAlias the administrative alias to receive the email
 * @param {object} [options] a configuration object
 * @param {string} [options.apiKey] an HIBP Pro API key; optional when a proxy
 * supplies authentication
 * @param {string} [options.baseUrl] a custom API base URL (default:
 * `https://haveibeenpwned.com/api/v3`)
 * @param {number} [options.timeoutMs] timeout in milliseconds (default: none)
 * @param {AbortSignal} [options.signal] an AbortSignal to cancel the request
 * @param {string} [options.userAgent] a custom User-Agent (default: `hibp <version>`)
 * @returns {Promise<void>} resolves when the approval email request succeeds;
 * rejects with an Error containing the upstream failure reason
 * @example
 * await sendEmail("example.com", "security", { apiKey: "my-pro-api-key" });
 * // Follow the link in the email sent to security@example.com.
 */
export async function sendEmail(
  domain: string,
  emailAlias: EmailAlias,
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
    "/domainVerification/sendEmail",
    { DomainName: domain, EmailAlias: emailAlias },
    options,
  );
}
