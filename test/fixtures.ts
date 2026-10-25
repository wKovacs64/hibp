import { stripIndents } from "common-tags";
import type {
  Breach,
  Paste,
  SubscriptionStatus,
} from "../src/api/haveibeenpwned/types.js";

export const VERIFIED_BREACH: Breach = {
  Name: "Adobe",
  Title: "Adobe",
  Domain: "adobe.com",
  BreachDate: "2013-10-04",
  AddedDate: "2013-12-04T00:00:00Z",
  ModifiedDate: "2013-12-04T00:00:00Z",
  PwnCount: 152445165,
  Description:
    'In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, <em>encrypted</em> password and a password hint in plain text. The password cryptography was poorly done and <a href="http://stricture-group.com/files/adobe-top100.txt" target="_blank" rel="noopener">many were quickly resolved back to plain text</a>. The unencrypted hints also <a href="http://www.troyhunt.com/2013/11/adobe-credentials-and-serious.html" target="_blank" rel="noopener">disclosed much about the passwords</a> adding further to the risk that hundreds of millions of Adobe customers already faced.',
  DataClasses: ["Email addresses", "Password hints", "Passwords", "Usernames"],
  IsVerified: true,
  IsFabricated: false,
  IsSensitive: false,
  IsRetired: false,
  IsSpamList: false,
  IsMalware: false,
  IsStealerLog: false,
  IsSubscriptionFree: false,
  LogoPath: "https://haveibeenpwned.com/Content/Images/PwnedLogos/Adobe.png",
  Attribution: null,
  DisclosureUrl: null,
};

export const UNVERIFIED_BREACH: Breach = {
  Name: "Badoo",
  Title: "Badoo",
  Domain: "badoo.com",
  BreachDate: "2013-06-01",
  AddedDate: "2016-07-06T08:16:03Z",
  ModifiedDate: "2016-07-06T08:16:03Z",
  PwnCount: 112005531,
  Description:
    'In June 2016, <a href="http://motherboard.vice.com/read/another-day-another-hack-user-accounts-of-dating-site-badoo" target="_blank" rel="noopener">a data breach allegedly originating from the social website Badoo was found to be circulating amongst traders</a>. Likely obtained several years earlier, the data contained 112 million unique email addresses with personal data including names, birthdates and passwords stored as MD5 hashes. Whilst there are many indicators suggesting Badoo did indeed suffer a data breach, <a href="https://www.troyhunt.com/introducing-unverified-breaches-to-have-i-been-pwned" target="_blank" rel="noopener">the legitimacy of the data could not be emphatically proven</a> so this breach has been categorised as &quot;unverified&quot;.',
  DataClasses: [
    "Dates of birth",
    "Email addresses",
    "Genders",
    "Names",
    "Passwords",
    "Usernames",
  ],
  IsVerified: false,
  IsFabricated: false,
  IsSensitive: true,
  IsRetired: false,
  IsSpamList: false,
  IsMalware: false,
  IsStealerLog: false,
  IsSubscriptionFree: false,
  LogoPath: "https://haveibeenpwned.com/Content/Images/PwnedLogos/Badoo.png",
  Attribution: null,
  DisclosureUrl: null,
};

// https://haveibeenpwned.com/api/v3/breach/Adpost
export const DISCLOSED_BREACH: Breach = {
  Name: "Adpost",
  Title: "Adpost",
  Domain: "adpost.com",
  BreachDate: "2025-02-14",
  AddedDate: "2025-10-07T00:15:09Z",
  ModifiedDate: "2025-12-17T23:27:30Z",
  PwnCount: 3339512,
  Description:
    'In February 2025, data obtained from an earlier Adpost breach surfaced. The dataset contained 3.3M records including email addresses, usernames, and display names. <a href="https://www.adpost.com/article/security-update-regarding-the-february-2025-adpost-data-breach" target="_blank" rel="noopener">Adpost later published a disclosure notice</a> and advised they\'d forced a credential refresh, among other actions.',
  LogoPath: "https://logos.haveibeenpwned.com/Adpost.png",
  Attribution: "https://t.me/all3in",
  DisclosureUrl:
    "https://www.adpost.com/article/security-update-regarding-the-february-2025-adpost-data-breach",
  DataClasses: ["Email addresses", "Names", "Usernames"],
  IsVerified: true,
  IsFabricated: false,
  IsSensitive: false,
  IsRetired: false,
  IsSpamList: false,
  IsMalware: false,
  IsSubscriptionFree: false,
  IsStealerLog: false,
};

// https://haveibeenpwned.com/api/v3/breach/AlienStealerLogs
export const STEALER_LOG_BREACH: Breach = {
  Name: "AlienStealerLogs",
  Title: "ALIEN TXTBASE Stealer Logs",
  Domain: "",
  BreachDate: "2025-02-15",
  AddedDate: "2025-02-25T19:25:18Z",
  ModifiedDate: "2025-02-25T19:25:18Z",
  PwnCount: 284132969,
  Description:
    'In February 2025, <a href="https://www.troyhunt.com/processing-23-billion-rows-of-alien-txtbase-stealer-logs" target="_blank" rel="noopener">23 billion rows of stealer logs were obtained from a Telegram channel known as ALIEN TXTBASE</a>. The data contained 284M unique email addresses alongside the websites they were entered into and the passwords used. This data is now searchable in HIBP by both email domain and the domain of the target website.',
  LogoPath: "https://logos.haveibeenpwned.com/List.png",
  Attribution: null,
  DisclosureUrl: null,
  DataClasses: ["Email addresses", "Passwords"],
  IsVerified: true,
  IsFabricated: false,
  IsSensitive: false,
  IsRetired: false,
  IsSpamList: false,
  IsMalware: false,
  IsSubscriptionFree: false,
  IsStealerLog: true,
};

export const PASTE: Paste = {
  Source: "Pastebin",
  Id: "8Q0BvKD8",
  Title: "syslog",
  Date: "2014-03-04T19:14:54Z",
  EmailCount: 139,
};

export const SUBSCRIPTION_STATUS: SubscriptionStatus = {
  SubscriptionName: "Pwned 1",
  Description:
    "Domains with up to 25 breached addresses each, and a rate limited API key allowing 10 email address searches per minute",
  SubscribedUntil: "2024-04-02T12:34:56",
  Rpm: 10,
  DomainSearchMaxBreachedAccounts: 25,
  IncludesStealerLogs: false,
};

export const PASSWORD = "password";

export const SHA1_PREFIX = "5BAA6";

export const SHA1_RESPONSE_BODY = stripIndents`
  003D68EB55068C33ACE09247EE4C639306B:3
  1E4C9B93F3F0682250B6CF8331B7EE68FD8:3303003
  01330C689E5D64F660D6947A93AD634EF8F:1
`;

export const SHA1_SUFFIXES_OBJECT = {
  "003D68EB55068C33ACE09247EE4C639306B": 3,
  "1E4C9B93F3F0682250B6CF8331B7EE68FD8": 3303003,
  "01330C689E5D64F660D6947A93AD634EF8F": 1,
};

export const NTLM_RESPONSE_BODY = stripIndents`
  B95AF67BEE5270A681E5410D611: 1
  B964C3513680B4C0204A157CCF5: 1110
  B9697A53922A10401EAB7504866: 1
`;

export const NTLM_SUFFIXES_OBJECT = {
  B95AF67BEE5270A681E5410D611: 1,
  B964C3513680B4C0204A157CCF5: 1110,
  B9697A53922A10401EAB7504866: 1,
};
