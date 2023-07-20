import { SECURITY_LEVEL, doesResultFitPolicy } from './level'

test('equal levels fit the policy', () => {
  expect(doesResultFitPolicy(SECURITY_LEVEL.advanced, SECURITY_LEVEL.advanced)).toBe(true);
});

test('higher result levels fit the policy', () => {
  expect(doesResultFitPolicy(SECURITY_LEVEL.advanced, SECURITY_LEVEL.good)).toBe(true);
  expect(doesResultFitPolicy(SECURITY_LEVEL.good, SECURITY_LEVEL.dubious)).toBe(true);
  expect(doesResultFitPolicy(SECURITY_LEVEL.dubious, SECURITY_LEVEL.insufficient)).toBe(true);
});

test('lower result levels do not fit the policy', () => {
  expect(doesResultFitPolicy(SECURITY_LEVEL.insufficient, SECURITY_LEVEL.dubious)).toBe(false);
  expect(doesResultFitPolicy(SECURITY_LEVEL.dubious, SECURITY_LEVEL.good)).toBe(false);
  expect(doesResultFitPolicy(SECURITY_LEVEL.good, SECURITY_LEVEL.advanced)).toBe(false);
});

test('not existing levels do not fit any policy', () => {
  expect(doesResultFitPolicy(undefined as any, SECURITY_LEVEL.insufficient)).toBe(false);
  expect(doesResultFitPolicy(null as any, SECURITY_LEVEL.advanced)).toBe(false);
});

test('not no levels fit not existing policies', () => {
  expect(doesResultFitPolicy(SECURITY_LEVEL.insufficient, undefined as any)).toBe(false);
  expect(doesResultFitPolicy(SECURITY_LEVEL.advanced, null as any)).toBe(false);
});

test('not existing levels do not fit not existing policies', () => {
  expect(doesResultFitPolicy(undefined as any, undefined as any)).toBe(false);
  expect(doesResultFitPolicy(null as any, null as any)).toBe(false);
});
