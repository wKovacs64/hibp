/* eslint-disable import/no-extraneous-dependencies */
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup Node (Vitest) request interception using the given mocks.
export const server = setupServer(...handlers);

// (some tests import msw exports from this file for convenience)
export * from 'msw';
