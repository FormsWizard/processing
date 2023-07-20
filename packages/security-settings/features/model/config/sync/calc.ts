import { SECURITY_LEVEL, doesResultFitPolicy, level2int } from '../../level';
import { SERVER } from '../../environment/model';
import { SYNC } from './model';
import { permittedConfigs } from './permitted-example';
import { isSubobject } from '../../../helper/subObject';

type PermissionConf = any;  // TODO
type Env = SERVER;
type Config = Partial<SYNC>

interface MatchingConfig {
  level: SECURITY_LEVEL|string,
  env: Env,
  configs: Config[]
}

function matchingEnv (env: Env, envGlob: Env|'*') {
  return envGlob === env || envGlob === '*'
}

function sortMatchingConfigs(matchingConfigs: MatchingConfig[]): MatchingConfig[] {
  return matchingConfigs.sort( (conf1, conf2) => level2int[conf1.level as SECURITY_LEVEL] > level2int[conf2.level as SECURITY_LEVEL] ? -1 : 1 )
}

export function filterMatchingConfigs(permittedConfigs: PermissionConf, policy: SECURITY_LEVEL, env: Env, config: Config): MatchingConfig[] {
  //console.log(permittedConfigs);
  const levelsFittingPolicy = Object.keys(permittedConfigs).filter( level => doesResultFitPolicy(level as SECURITY_LEVEL, policy) );
  //console.log(levelsFittingPolicy);
  const configsMap: MatchingConfig[] = levelsFittingPolicy.map( level => { const configsByEnv = permittedConfigs[level];
                                                         return Object.keys(configsByEnv)
                                                                      .map( (e: any) => { return { 'level': level,
                                                                                                   'env': e, 
                                                                                                   'configs': configsByEnv[e] }} );
                                                       }
                                            ).flat()
  //console.log(configsMap)
  const matchingConfigs = configsMap.filter( conf => matchingEnv(env, conf.env) )
                                    .map( conf => ({...conf, configs: conf.configs.filter( (c: any) => isSubobject(config, c) )}) )
                                    .filter( conf => conf.configs.length > 0 )
  return matchingConfigs;
}

export function check(permittedConfigs: PermissionConf, policy: SECURITY_LEVEL, env: Env, config: Config): boolean {
  return filterMatchingConfigs(permittedConfigs, policy, env, config).length > 0;
}

export function assessSecurityLevel(permittedConfigs: PermissionConf, policy: SECURITY_LEVEL, env: Env, config: Config): SECURITY_LEVEL|null {
  const matchingConfigs = filterMatchingConfigs(permittedConfigs, policy, env, config);
  const sortedMatchingConfigs = sortMatchingConfigs(matchingConfigs);
  return sortedMatchingConfigs.length > 0 ? sortedMatchingConfigs[0].level as SECURITY_LEVEL : null;
}



export function checkSync(level: SECURITY_LEVEL, env: SERVER, config: SYNC) {
  return check(permittedConfigs, level, env, config);
}
