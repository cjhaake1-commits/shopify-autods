import os from 'node:os';
export function isWindowsHost(platform=os.platform()): boolean { return platform === 'win32'; }
export function windowsHostMessage(): string { return 'WINDOWS HOST REQUIRED\nRun this command from the local Windows checkout of cjhaake1-commits/shopify-autods.'; }
