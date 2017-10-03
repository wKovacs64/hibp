import search from '../src/search';
import './mockAxios';
import { ACCOUNT_BREACHED, EMAIL_PASTED } from './testData';

describe('search', () => {
  const successHandler = jest.fn();

  afterEach(() => {
    successHandler.mockReset();
  });

  it('should search breaches by username', () =>
    search(ACCOUNT_BREACHED)
      .then(successHandler)
      .then(() => {
        expect(successHandler.mock.calls.length).toBe(1);
        const result = successHandler.mock.calls[0][0];
        expect(result).toEqual(
          expect.objectContaining({ breaches: [], pastes: null }),
        );
      }));

  it('should search breaches and pastes by email address', () =>
    search(EMAIL_PASTED)
      .then(successHandler)
      .then(() => {
        expect(successHandler.mock.calls.length).toBe(1);
        const result = successHandler.mock.calls[0][0];
        expect(result).toEqual(
          expect.objectContaining({ breaches: [], pastes: [] }),
        );
      }));
});
