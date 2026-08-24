import os from 'node:os'; import { BrowserManager } from '../src/browser/manager.js'; import { isWindowsHost, windowsHostMessage } from '../src/security/environment.js';
if (!isWindowsHost(os.platform())) { console.error(windowsHostMessage()); process.exit(2); }
console.log('Use npm run edge:cdp to start normal Microsoft Edge, then complete AutoDS login manually.');
