import type { AutoDSProduct } from '../models/types.js';
import { normalizeAutoDS } from './normalize.js';
import type { Page } from 'playwright';

export class AutoDSReader {
  constructor(private pageProvider: () => Page | null) {}
  private async text() { const p = this.pageProvider(); return p ? await p.locator('body').innerText().catch(() => '') : ''; }
  async stores() {
    const p = this.pageProvider(); if (!p) return [];
    const links = await p.locator('a[href*="store"], a[href*="shop"]').allTextContents().catch(() => []);
    return [...new Set(links.map(name => name.trim()).filter(Boolean))].map((name, i) => ({ id: `visible-${i + 1}`, name }));
  }
  async products() {
    const p = this.pageProvider(); if (!p) return [] as AutoDSProduct[];
    const rows = await p.locator('[data-product-id], [data-testid*="product"], tr').evaluateAll(els => els.map(el => ({ id: el.getAttribute('data-product-id') ?? '', title: (el.textContent ?? '').trim() })).filter(x => x.title));
    return rows.map(normalizeAutoDS).filter(x => x.title && x.id);
  }
  async search(q: string) { const products = await this.products(); return products.filter(p => p.title.toLowerCase().includes(q.toLowerCase())); }
  async evidence() { return { page_url: this.pageProvider()?.url() ?? null, visible_text_available: (await this.text()).length > 0 }; }
}
