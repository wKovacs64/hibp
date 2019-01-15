import { HIBP } from '../../types/hibp.d';

declare global {
  interface Window {
    hibp: HIBP;
  }
}
