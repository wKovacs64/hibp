import {polyfill} from 'es6-promise';
if (global.Promise === undefined) {
  polyfill();
}

const DOMAIN = 'foo.bar';

export const ERR = new Error('Set sail for fail!');
export const INVALID_HEADER = 'baz';
export const ACCOUNT_BREACHED = 'foo';
export const ACCOUNT_CLEAN = 'bar';
export const BREACH_FOUND = 'foo';
export const BREACH_NOT_FOUND = 'bar';
export const EMAIL_PASTED = 'foo@bar.com';
export const EMAIL_CLEAN = 'baz@qux.com';
export const EMAIL_INVALID = 'foobar';
export const OPTS_DOM = {domain: DOMAIN};
export const OPTS_TRUNC = {truncate: true};
export const OPTS_DOM_TRUNC = {domain: DOMAIN, truncate: true};
export const RESPONSE_OBJ = {};
export const RESPONSE_ARY = [];
export const RESPONSE_CLEAN = null;
export const STATUS_200 = 200;
export const STATUS_400 = 400;
export const STATUS_403 = 403;
export const STATUS_404 = 404;
