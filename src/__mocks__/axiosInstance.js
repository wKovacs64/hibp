export default {
  get: jest.fn(() => Promise.resolve({ status: 418, data: {} })),
};
