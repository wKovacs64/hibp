import type { HIBP } from '../src/hibp';

declare global {
  interface Window {
    hibp: HIBP;
  }
}
