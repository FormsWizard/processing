import { SECURITY_LEVEL } from '../policy/level';
import { ENV, SERVER, CLIENT } from '../environment/model'
import { SYNC } from "./sync/model";

export type EnvOrGlob = ENV|'*';

export type CONFIG = Partial<SYNC>;

export type ConfigsForEnv<EnvType extends EnvOrGlob> = Partial<{
  [Property in EnvType]: CONFIG[];
}>;
export type CONFIGS_FOR_ENV = ConfigsForEnv<'*'>|ConfigsForEnv<SERVER>|ConfigsForEnv<CLIENT>;

type CONFIGS_FOR_ENV_AND_LEVEL = Partial<{
  [Property in SECURITY_LEVEL]: CONFIGS_FOR_ENV
}>;
export type THREAT_MODEL = CONFIGS_FOR_ENV_AND_LEVEL;
