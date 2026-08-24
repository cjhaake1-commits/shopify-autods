import { chromium, type Browser, type BrowserContext, type Page } from 'playwright'; import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os'; import { isWindowsHost, windowsHostMessage } from '../security/environment.js';
export class BrowserManager { browser:Browser|null=null; context:BrowserContext|null=null; page:Page|null=null; profile:string; url:string; constructor(profile=process.env.BROWSER_PROFILE_DIR??'./browser-profile',url=process.env.AUTODS_URL??'https://app.autods.com'){this.profile=path.resolve(profile);this.url=url;}
 async launch(){if(!isWindowsHost(os.platform())) throw new Error(windowsHostMessage()); fs.mkdirSync(this.profile,{recursive:true}); this.context=await chromium.launchPersistentContext(this.profile,{channel:'msedge',headless:false}); this.page=this.context.pages()[0]??await this.context.newPage(); await this.page.goto(this.url,{waitUntil:'domcontentloaded',timeout:30000}).catch(()=>{}); return this.page;}
 async close(){await this.context?.close();this.context=null;this.page=null;}
 authenticated(){const u=this.page?.url()??''; return !!this.page && !/login|signin|auth/i.test(u) && !!u;}
}
