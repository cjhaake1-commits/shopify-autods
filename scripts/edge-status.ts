import { BrowserManager } from '../src/browser/manager.js';
const b = new BrowserManager();
try { await b.attach(); console.log(JSON.stringify(b.status(), null, 2)); process.exitCode = b.authenticated() ? 0 : 1; }
catch (e) { console.error(JSON.stringify({ cdp_reachable:false, edge_reachable:false, autods_tab_found:false, autods_authenticated:false, instruction:'Run npm run edge:cdp, then authenticate manually in the dedicated Edge window.' }, null, 2)); process.exitCode = 1; }
