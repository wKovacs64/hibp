import { expect } from 'chai';
import isEmail from '../src/isEmail';
import { EMAIL_CLEAN, EMAIL_PASTED, EMAIL_INVALID } from './testData';

describe('isEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(isEmail(EMAIL_CLEAN)).to.be.true;
    expect(isEmail(EMAIL_PASTED)).to.be.true;
  });

  it('should return false for invalid email addresses', () => {
    expect(isEmail(EMAIL_INVALID)).to.be.false;
  });
});
