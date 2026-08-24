import type { AutoDSProduct, ShopifyProduct } from '../models/types.js';
export function reconcile(a:AutoDSProduct[], s:ShopifyProduct[]) { return a.map(p=>{const match=s.find(x=>x.title.trim().toLowerCase()===p.title.trim().toLowerCase()); return {autodsProductId:p.id,title:p.title,classification:match?'AUTODS_VERIFIED':'AUTODS_NOT_IN_SHOPIFY',shopifyProductId:match?.id??null};}); }
