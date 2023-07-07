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
  LogoPath: string;
  DataClasses: string[];
  IsVerified: boolean;
  IsFabricated: boolean;
  IsSensitive: boolean;
  IsRetired: boolean;
  IsSpamList: boolean;
}

export interface Paste {
  Id: string;
  Source: string;
  Title: string;
  Date: string;
  EmailCount: number;
}

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
  | Paste[] // pasteaccount
  | string[] // dataclasses
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

/**
 * All possible values that can be returned in the response body of an API query
 *
 * @internal
 */
export type ResponseBody = ApiData | ErrorData;
