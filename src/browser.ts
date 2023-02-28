import { CypressChainable } from './cypress-component-chainable';
import { BrowserMethods } from './browser.types';

export const Browser: CypressChainable<BrowserMethods> = cy;
