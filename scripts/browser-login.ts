import os from 'node:os'; import { BrowserManager } from '../src/browser/manager.js'; import { isWindowsHost, windowsHostMessage } from '../src/security/environment.js';
if (!isWindowsHost(os.platform())) { console.error(windowsHostMessage()); process.exit(2); }
const b=new BrowserManager(process.env.BROWSER_PROFILE_DIR??'.local/edge-autods-profile'); await b.launch(); console.log('Dedicated Microsoft Edge opened. Complete AutoDS login manually; state remains in the ignored local profile.');
