/* eslint-disable import/no-extraneous-dependencies */
import { setupServer } from 'msw/node';

// Setup Node (Vitest) request interception using the given mocks.
export const server = setupServer();
