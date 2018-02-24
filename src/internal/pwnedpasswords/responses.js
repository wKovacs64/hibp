/**
 * Known potential responses from the remote API.
 *
 * https://haveibeenpwned.com/API/v2#PwnedPasswords
 *
 */

export const RANGE_OK = {
  status: 200,
  response:
    '0018A45C4D1DEF81644B54AB7F969B88D65:1\n' +
    '00D4F6E8FA6EECAD2A3AA415EEC418D38EC:2',
};

export const RANGE_BAD_REQUEST = {
  status: 400,
  response: 'The hash prefix was not in a valid format',
};

export const PASSWORD_NOT_FOUND = {
  status: 404,
};
