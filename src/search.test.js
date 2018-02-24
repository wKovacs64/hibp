import { ACCOUNT_BREACHED, EMAIL_PASTED } from '../test/fixtures';
import search from './search';

describe('search', () => {
  it('should search breaches by username', () =>
    expect(search(ACCOUNT_BREACHED)).resolves.toEqual({
      breaches: [],
      pastes: null,
    }));

  it('should search breaches and pastes by email address', () =>
    expect(search(EMAIL_PASTED)).resolves.toEqual({
      breaches: [],
      pastes: [],
    }));
});
