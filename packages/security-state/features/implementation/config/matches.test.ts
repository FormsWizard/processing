import { filterConfigMaps, check } from './matches';
import { assessSecurityLevel } from './assess';

import { SECURITY_LEVEL } from '../../model';
import { environment } from '../../model/environment/state';
import { syncThreatModel } from '../../model/config/sync/threatmodel-example';
import { syncConfig } from '../../model/config/sync/state-example';

const env = environment.syncServer.webrtc;

test('0 matching configs at level advanced', () => {
  expect( JSON.stringify(filterConfigMaps(syncThreatModel, SECURITY_LEVEL.advanced, env, syncConfig)) )
    .toBe( '[]' );
  expect( check(syncThreatModel, SECURITY_LEVEL.advanced, env, syncConfig) ).toBeFalsy();
  expect( assessSecurityLevel(syncThreatModel, SECURITY_LEVEL.advanced, env, syncConfig) ).toBe(null);
});

test('1 matching configs at level good', () => {
  expect( JSON.stringify(filterConfigMaps(syncThreatModel, SECURITY_LEVEL.good, env, syncConfig)) )
    .toBe( '[{"level":"good","env":"local","configs":[{"e2e_encryption":"builtin"}]}]' );
  expect( check(syncThreatModel, SECURITY_LEVEL.good, env, syncConfig) ).toBeTruthy();
  expect( assessSecurityLevel(syncThreatModel, SECURITY_LEVEL.good, env, syncConfig) ).toBe(SECURITY_LEVEL.good);
});

test('2 matching configs at level dubious', () => {
  expect( JSON.stringify(filterConfigMaps(syncThreatModel, SECURITY_LEVEL.dubious, env, syncConfig)) )
    .toBe( '[{"level":"good","env":"local","configs":[{"e2e_encryption":"builtin"}]},{"level":"dubious","env":"local","configs":[{}]}]' );
  expect( check(syncThreatModel, SECURITY_LEVEL.dubious, env, syncConfig) ).toBeTruthy();
  expect( assessSecurityLevel(syncThreatModel, SECURITY_LEVEL.dubious, env, syncConfig) ).toBe(SECURITY_LEVEL.good);
});
