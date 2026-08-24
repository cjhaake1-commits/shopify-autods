import {describe,it,expect} from 'vitest'; import {isWindowsHost,windowsHostMessage} from '../src/security/environment.js';
describe('Windows host mode',()=>{it('detects platforms',()=>{expect(isWindowsHost('win32')).toBe(true);expect(isWindowsHost('linux')).toBe(false)});it('has safe instruction',()=>expect(windowsHostMessage()).toContain('WINDOWS HOST REQUIRED'));});
