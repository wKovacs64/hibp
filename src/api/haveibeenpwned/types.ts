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
  IsSubscriptionFree: boolean;
  LogoPath: string;
}

export interface Paste {
  Id: string;
  Source: string;
  Title: string;
  Date: string;
  EmailCount: number;
}

export interface SubscriptionStatus {
  SubscriptionName: string;
  Description: string;
  SubscribedUntil: string;
  Rpm: number;
  DomainSearchMaxBreachedAccounts: number;
  IncludesStealerLogs: boolean;
}

export interface SubscribedDomain {
  DomainName: string;
  PwnCount: number | null;
  PwnCountExcludingSpamLists: number | null;
  PwnCountExcludingSpamListsAtLastSubscriptionRenewal: number | null;
  NextSubscriptionRenewal: string | null;
}

export type BreachedDomainsByEmailAlias = Record<string, string[]>;

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
  | BreachedDomainsByEmailAlias // breacheddomain
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
