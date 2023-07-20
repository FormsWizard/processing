import { filterMatchingConfigs, assessSecurityLevel, checkSync } from './calc';
import { permittedConfigs } from './permitted-example';
import { SECURITY_LEVEL } from '../../level';
import { environment } from '../../environment/state';
import { syncConfig } from './state-example';

const env = environment.syncServer.webrtc;

test('0 matching configs at level advanced', () => {
  expect( JSON.stringify(filterMatchingConfigs(permittedConfigs, SECURITY_LEVEL.advanced, env, syncConfig)) )
    .toBe( '[]' );
  expect( checkSync(SECURITY_LEVEL.advanced, env, syncConfig) ).toBeFalsy();
  expect( assessSecurityLevel(permittedConfigs, SECURITY_LEVEL.advanced, env, syncConfig) ).toBe(null);
});

test('1 matching configs at level good', () => {
  expect( JSON.stringify(filterMatchingConfigs(permittedConfigs, SECURITY_LEVEL.good, env, syncConfig)) )
    .toBe( '[{"level":"good","env":"local","configs":[{"e2e_encryption":"builtin"}]}]' );
  expect( checkSync(SECURITY_LEVEL.good, env, syncConfig) ).toBeTruthy();
  expect( assessSecurityLevel(permittedConfigs, SECURITY_LEVEL.good, env, syncConfig) ).toBe(SECURITY_LEVEL.good);
});

test('2 matching configs at level dubious', () => {
  expect( JSON.stringify(filterMatchingConfigs(permittedConfigs, SECURITY_LEVEL.dubious, env, syncConfig)) )
    .toBe( '[{"level":"good","env":"local","configs":[{"e2e_encryption":"builtin"}]},{"level":"dubious","env":"local","configs":[{}]}]' );
  expect( checkSync(SECURITY_LEVEL.dubious, env, syncConfig) ).toBeTruthy();
  expect( assessSecurityLevel(permittedConfigs, SECURITY_LEVEL.dubious, env, syncConfig) ).toBe(SECURITY_LEVEL.good);
});
