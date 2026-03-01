import { RateLimitError } from "./api/haveibeenpwned/fetch-from-api.js";
import { breach } from "./breach.js";
import { breachedAccount } from "./breached-account.js";
import { breachedDomain } from "./breached-domain.js";
import { breaches } from "./breaches.js";
import { dataClasses } from "./data-classes.js";
import { latestBreach } from "./latest-breach.js";
import { pasteAccount } from "./paste-account.js";
import { pwnedPassword } from "./pwned-password.js";
import { pwnedPasswordRange } from "./pwned-password-range.js";
import { search } from "./search.js";
import { stealerLogsByEmail } from "./stealer-logs-by-email.js";
import { stealerLogsByEmailDomain } from "./stealer-logs-by-email-domain.js";
import { stealerLogsByWebsiteDomain } from "./stealer-logs-by-website-domain.js";
import { subscribedDomains } from "./subscribed-domains.js";
import { subscriptionStatus } from "./subscription-status.js";

export type * from "./api/haveibeenpwned/types.js";

/*
 * Export individual named functions to allow the following:
 *
 * import * as hibp from 'hibp';       // ESM (with tree-shaking)
 * import { search } from 'hibp';      // ESM (with tree-shaking)
 * const { search } = require('hibp'); // CommonJS
 * const hibp = require('hibp');       // CommonJS
 */

export {
  breach,
  breachedAccount,
  breachedDomain,
  breaches,
  dataClasses,
  latestBreach,
  pasteAccount,
  pwnedPassword,
  pwnedPasswordRange,
  search,
  stealerLogsByEmail,
  stealerLogsByEmailDomain,
  stealerLogsByWebsiteDomain,
  subscribedDomains,
  subscriptionStatus,
  RateLimitError,
};

// Export the overall interface
export interface HIBP {
  breach: typeof breach;
  breachedAccount: typeof breachedAccount;
  breachedDomain: typeof breachedDomain;
  breaches: typeof breaches;
  dataClasses: typeof dataClasses;
  latestBreach: typeof latestBreach;
  pasteAccount: typeof pasteAccount;
  pwnedPassword: typeof pwnedPassword;
  pwnedPasswordRange: typeof pwnedPasswordRange;
  search: typeof search;
  stealerLogsByEmail: typeof stealerLogsByEmail;
  stealerLogsByEmailDomain: typeof stealerLogsByEmailDomain;
  stealerLogsByWebsiteDomain: typeof stealerLogsByWebsiteDomain;
  subscribedDomains: typeof subscribedDomains;
  subscriptionStatus: typeof subscriptionStatus;
  RateLimitError: typeof RateLimitError;
}

// https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/How-to-document-TypeScript#jsdoc-comments-disappear
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const JSDOC2MARKDOWN_STUB = undefined;
