//
// Data Models from the API
//

export interface Breach {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  ModifiedDate: string;
  PwnCount: number;
  Description: string;
  DataClasses: string[];
  IsVerified: boolean;
  IsFabricated: boolean;
  IsSensitive: boolean;
  IsRetired: boolean;
  IsSpamList: boolean;
  IsMalware: boolean;
  IsStealerLog: boolean;
  IsSubscriptionFree: boolean;
  LogoPath: string;
  Attribution: string | null;
  DisclosureUrl: string | null;
}

export interface Paste {
  Id: string;
  Source: string;
  Title?: string;
  Date: string | null;
  EmailCount: number;
}

export interface DataClassDescription {
  name: string;
  description: string;
}

export interface SubscriptionStatus {
  SubscriptionName: string;
  Description: string;
  SubscribedUntil: string;
  Rpm: number;
  DomainSearchMaxBreachedAccounts: number;
  MaxBreachedDomains: number | null;
  IncludesStealerLogs: boolean;
  IncludesBulkDomainAdd: boolean;
  IncludesAutoSubdomainVerification: boolean;
  IncludesCustomerDomains: boolean;
  IncludesKAnon: boolean;
}

export interface SubscribedDomain {
  DomainName: string;
  PwnCount: number | null;
  PwnCountExcludingSpamLists: number | null;
  PwnCountExcludingSpamListsAtLastSubscriptionRenewal: number | null;
  NextSubscriptionRenewal: string | null;
}

export interface DnsToken {
  txtRecordValue: string;
}

export type BreachedDomainsByEmailAlias = Record<string, string[]>;

export interface BreachedAccountRangeResult {
  hashSuffix: string;
  websites: string[];
}

export type StealerLogDomainsByEmailAlias = Record<string, string[]>;

//
// Internal convenience types
//

/**
 * Data returned in the response body of a successful API query
 *
 * @internal
 */
export type ApiData =
  | Breach // breach
  | Breach[] // breachedaccount, breaches
  | BreachedAccountRangeResult[] // breachedaccount/range
  | Pick<Breach, "Name">[] // breachedaccount
  | BreachedDomainsByEmailAlias // breacheddomain
  | DataClassDescription[] // dataclasses/descriptions
  | Paste[] // pasteaccount
  | string[] // dataclasses, stealerlogsbyemail, stealerlogsbywebsitedomain
  | StealerLogDomainsByEmailAlias // stealerlogsbyemaildomain
  | SubscriptionStatus // subscription/status
  | SubscribedDomain[] // subscribeddomains
  | null; // most endpoints can return an empty response (404, but not an error)

/**
 * Data returned in the response body of a failed API query
 *
 * @internal
 */
export interface ErrorData {
  statusCode: number;
  message: string;
}
