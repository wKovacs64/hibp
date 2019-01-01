/** @internal */
export default class AxiosError extends Error {
  constructor(response) {
    super();
    this.response = response;
  }
}
