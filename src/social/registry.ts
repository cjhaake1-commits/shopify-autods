import type { SocialAccount, SocialPlatform } from './models.js';
const platforms:SocialPlatform[]=['instagram','facebook','tiktok','youtube','pinterest','x']; const brands=['MOTORYN','OMNIFINDA','CADENCE_AND_CARAT'];
export function listSocialBrands(){return brands.map(brand=>({brand,platforms}))}
export function listSocialAccounts(brand?:string):SocialAccount[]{return brands.filter(x=>!brand||x===brand).flatMap(b=>platforms.map(platform=>({brand:b,platform,accountId:null,displayName:null,connected:false,capabilities:[],status:'NOT_CONNECTED',scopes:[]})))}
