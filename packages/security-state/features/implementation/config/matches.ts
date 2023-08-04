import { THREAT_MODEL, ConfigsForEnv, SECURITY_LEVEL, ENV, CONFIG, doesResultFitPolicy } from '../../model'
import { isSubobject } from '../helper/subObject';

export interface ConfigMap<E> {
  level: SECURITY_LEVEL|string,
  env: E,
  configs: CONFIG[]
}

function matchingEnv<E> (env: E, envGlob: E|'*') {
  return envGlob === env || envGlob === '*'
}

/**
 * For a given `threatModel` it returns it's entries, for which:
 * - doesResultFitPolicy(threatModel.level, `policy`)
 * - matchingEnv(env, threatModel.env)
 * - isSubobject(testedConfig, threatModel.env)
 **/
export function filterConfigMaps<E extends ENV>(threatModel: THREAT_MODEL, policy: SECURITY_LEVEL, env: ENV, testedConfig: CONFIG): ConfigMap<E>[] {
  const levelsMatchingPolicy: SECURITY_LEVEL[] = (Object.keys(threatModel) as SECURITY_LEVEL[])
                                                .filter( level => doesResultFitPolicy(level, policy) );
  const configsMatchingPolicy: ConfigMap<E>[] = levelsMatchingPolicy.map( level => { const configsByEnv = threatModel[level] as ConfigsForEnv<E>;
                                                                                     return (Object.keys(configsByEnv) as E[])
                                                                                                   .map( e => { return { 'level': level,
                                                                                                                         'env': e,
                                                                                                                         'configs': configsByEnv[e] as CONFIG[] }} );
                                                                                   }
                                                                        ).flat();
  const matchingConfigs = configsMatchingPolicy.filter( conf => matchingEnv(env, conf.env) )
                                               .map( conf => ({...conf, configs: conf?.configs.filter( c => isSubobject(testedConfig, c) )}) )
                                               .filter( conf => conf.configs.length > 0 )
  return matchingConfigs;
}

/** Checks that for the given arguments at least one matching entry in the threatModel provides the required security level. **/
export function check<E extends ENV>(threatModel: THREAT_MODEL, policy: SECURITY_LEVEL, env: ENV, config: CONFIG): boolean {
  return filterConfigMaps(threatModel, policy, env, config).length > 0;
}
