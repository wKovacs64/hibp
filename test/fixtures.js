const DOMAIN = 'foo.bar';

export const UNKNOWN = {
  status: 999,
  statusText: 'Unknown - something unexpected happened.',
};
export const ERR = new Error('Set sail for fail!');
export const INVALID_HEADER = 'baz';
export const RATE_LIMITED = 'quux';
export const UNEXPECTED = 'qux';
export const ACCOUNT_BREACHED = 'foo123';
export const ACCOUNT_CLEAN = 'bar123';
export const BREACH_FOUND = 'foo456';
export const BREACH_NOT_FOUND = 'bar456';
export const EMAIL_PASTED = 'foo789@bar.com';
export const EMAIL_CLEAN = 'baz789@qux.com';
export const EMAIL_INVALID = 'foobar';
export const PASSWORD_PWNED = 'password';
export const PASSWORD_CLEAN = 'reallyitsclean';
export const OPTS_DOM = { domain: DOMAIN };
export const OPTS_TRUNC = { truncate: true };
export const OPTS_DOM_TRUNC = { domain: DOMAIN, truncate: true };
export const RANGE_PASSWORD_PWNED = '5BAA6';
export const RANGE_PASSWORD_CLEAN = '01EEC';
export const RANGE_INVALID = '21BD';
export const RESPONSE_OBJ = {};
export const RESPONSE_ARY = [];
export const RESPONSE_CLEAN = null;
export const RANGE_PASSWORD_PWNED_RESPONSE = `003D68EB55068C33ACE09247EE4C639306B:3
1E4C9B93F3F0682250B6CF8331B7EE68FD8:3303003
01330C689E5D64F660D6947A93AD634EF8F:1`;
export const RANGE_PASSWORD_CLEAN_RESPONSE = `005EFD37AF14D024EA43731427CF1298ED3:2
01B70E6A414C4E408CBFCE994104CEF2292:2
01E2642ADE813D24A943A0AFA9218B543B7:1`;
