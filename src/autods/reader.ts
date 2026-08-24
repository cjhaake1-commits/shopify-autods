import type { AutoDSProduct } from '../models/types.js';
import { normalizeAutoDS } from './normalize.js';
import type { Page } from 'playwright';

export class AutoDSReader {
  constructor(private pageProvider: () => Page | null) {}
  private async text() { const p = this.pageProvider(); return p ? await p.locator('body').innerText().catch(() => '') : ''; }
  async stores() {
    const p = this.pageProvider(); if (!p) return [];
    const body = await this.text();
    const names = [...body.matchAll(/(?:Select Store\s+)?(autods user store[^\n]+)/gi)].map(m => m[1].trim());
    return [...new Set(names)].map((name, i) => ({ id: `visible-${i + 1}`, name }));
  }
  async products() {
    const p = this.pageProvider(); if (!p) return [] as AutoDSProduct[];
    const rows: any[] = await p.locator('tr').evaluateAll(els => els.map(el => {
      const text = (el.textContent ?? '').replace(/\s+/g, ' ').trim();
      const title = text.match(/^(.*?)\s+Aug \d{1,2}, \d{4}/)?.[1] ?? '';
      const buy = text.match(/BUY\s+([A-Z0-9_\-]+)/)?.[1] ?? '';
      const costs = [...text.matchAll(/BUY\s+\$(\d+(?:\.\d+)?)\s*(?:-\s*\$(\d+(?:\.\d+)?))?/g)].map(m => Number(m[1]));
      const sell = [...text.matchAll(/SELL\s+\$(\d+(?:\.\d+)?)\s*(?:-\s*\$(\d+(?:\.\d+)?))?/g)].map(m => Number(m[1]));
      const stock = text.match(/\s(\d+)\s+0\s+0\s+\d+\s+-\s+BUY/)?.[1];
      return { id: buy, title, sourceCost: costs[0], shippingCost: null, stock: stock ? Number(stock) : null, rawText: text, retailHint: sell[0] };
    }).filter(x => x.title && x.id));
    if (!rows.length) {
      const lines = (await p.locator('body').innerText().catch(() => '')).split(/\r?\n/).map(x => x.trim()).filter(Boolean);
      for (let i = 1; i < lines.length; i++) {
        if (/^Aug \d{1,2}, \d{4}$/.test(lines[i])) {
          const title = lines[i - 1]; const chunk = lines.slice(i, i + 28).join(' ');
          const id = chunk.match(/BUY\s+([A-Z0-9_\-]+)/)?.[1] ?? '';
          const cost = Number(chunk.match(/BUY\s+\$(\d+(?:\.\d+)?)/)?.[1]);
          const stock = Number(chunk.match(/\s(\d+)\s+0\s+0\s+\d+\s+-\s+BUY/)?.[1]);
          if (title && id) rows.push({ id, title, sourceCost: Number.isFinite(cost) ? cost : null, shippingCost: null, stock: Number.isFinite(stock) ? stock : null, rawText: chunk, retailHint: null });
        }
      }
    }
    return rows.map(normalizeAutoDS).filter(x => x.title && x.id);
  }
  async search(q: string) { const products = await this.products(); return products.filter(p => p.title.toLowerCase().includes(q.toLowerCase())); }
  async evidence() { return { page_url: this.pageProvider()?.url() ?? null, visible_text_available: (await this.text()).length > 0 }; }
}
