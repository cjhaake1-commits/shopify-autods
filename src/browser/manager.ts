import { chromium, type Browser, type BrowserContext, type Page } from 'playwright';
import path from 'node:path';
import os from 'node:os';
import { isWindowsHost, windowsHostMessage } from '../security/environment.js';

export const DEFAULT_CDP_ENDPOINT = 'http://127.0.0.1:9222';
export const AUTODS_HOST = 'app.autods.com';

export class BrowserManager {
  browser: Browser | null = null;
  context: BrowserContext | null = null;
  page: Page | null = null;
  readonly profile: string;
  readonly url: string;
  readonly cdpEndpoint: string;

  constructor(profile = process.env.BROWSER_PROFILE_DIR ?? '.local/edge-autods-profile', url = process.env.AUTODS_URL ?? 'https://app.autods.com', cdpEndpoint = process.env.EDGE_CDP_ENDPOINT ?? DEFAULT_CDP_ENDPOINT) {
    this.profile = path.resolve(profile);
    this.url = url;
    this.cdpEndpoint = cdpEndpoint;
  }

  async attach() {
    if (!isWindowsHost(os.platform())) throw new Error(windowsHostMessage());
    this.browser = await chromium.connectOverCDP(this.cdpEndpoint);
    this.context = this.browser.contexts()[0] ?? null;
    if (!this.context) throw new Error('Edge CDP is reachable but has no browser context. Run npm run edge:cdp.');
    this.page = this.findAutoDSTab() ?? this.context.pages()[0] ?? null;
    if (!this.page) throw new Error('Edge CDP is reachable but has no tabs. Run npm run edge:cdp.');
    return this.page;
  }

  findAutoDSTab() { return this.context?.pages().find(p => { try { return new URL(p.url()).hostname.endsWith(AUTODS_HOST); } catch { return false; } }) ?? null; }
  async ensureAttached() { return this.page?.isClosed() ? this.attach() : (this.page ?? this.attach()); }
  async close() { this.browser?.close(); this.browser = null; this.context = null; this.page = null; }
  authenticated() { const page = this.findAutoDSTab() ?? this.page; const u = page?.url() ?? ''; return !!page && new URL(u).hostname.endsWith(AUTODS_HOST) && !/login|signin|auth/i.test(new URL(u).pathname); }
  status() { return { cdp_reachable: !!this.browser, edge_reachable: !!this.context, autods_tab_found: !!this.findAutoDSTab(), autods_authenticated: this.authenticated() }; }
}
