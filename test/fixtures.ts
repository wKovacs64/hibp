import { stripIndents } from 'common-tags';
import { Breach, Paste } from '../src/api/haveibeenpwned/types';

export const EXAMPLE_BREACH: Breach = {
  Name: 'Adobe',
  Title: 'Adobe',
  Domain: 'adobe.com',
  BreachDate: '2013-10-04',
  AddedDate: '2013-12-04T00:00:00Z',
  ModifiedDate: '2013-12-04T00:00:00Z',
  PwnCount: 152445165,
  Description:
    'In October 2013, 153 million Adobe accounts were breached with each containing an internal ID, username, email, <em>encrypted</em> password and a password hint in plain text. The password cryptography was poorly done and <a href="http://stricture-group.com/files/adobe-top100.txt" target="_blank" rel="noopener">many were quickly resolved back to plain text</a>. The unencrypted hints also <a href="http://www.troyhunt.com/2013/11/adobe-credentials-and-serious.html" target="_blank" rel="noopener">disclosed much about the passwords</a> adding further to the risk that hundreds of millions of Adobe customers already faced.',
  LogoPath: 'https://haveibeenpwned.com/Content/Images/PwnedLogos/Adobe.png',
  DataClasses: ['Email addresses', 'Password hints', 'Passwords', 'Usernames'],
  IsVerified: true,
  IsFabricated: false,
  IsSensitive: false,
  IsRetired: false,
  IsSpamList: false,
};

export const EXAMPLE_PASTE: Paste = {
  Source: 'Pastebin',
  Id: '8Q0BvKD8',
  Title: 'syslog',
  Date: '2014-03-04T19:14:54Z',
  EmailCount: 139,
};

export const EXAMPLE_PASSWORD_HASHES = stripIndents`
  003D68EB55068C33ACE09247EE4C639306B:3
  1E4C9B93F3F0682250B6CF8331B7EE68FD8:3303003
  01330C689E5D64F660D6947A93AD634EF8F:1
`;
