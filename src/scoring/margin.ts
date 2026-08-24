export function landedCost(source: number|null, shipping: number|null): number|null { return source == null || shipping == null ? null : round(source + shipping); }
export function grossProfit(retail: number|null, landed: number|null): number|null { return retail == null || landed == null ? null : round(retail - landed); }
export function grossMargin(retail: number|null, landed: number|null): number|null { const p = grossProfit(retail, landed); return retail && p != null ? round(p / retail, 4) : null; }
export function round(n:number, digits=2) { const f=10**digits; return Math.round(n*f)/f; }
export const retailLadders = [19.99,24.99,29.99,39.99,49.99,59.99,69.99,79.99,89.99,99.99,119.99,129.99,149.99,199.99];
export function suggestedRetail(cost:number|null, target=.6):number|null { if(cost==null) return null; const min=cost/(1-target); return retailLadders.find(p=>p>=min) ?? round(min); }
