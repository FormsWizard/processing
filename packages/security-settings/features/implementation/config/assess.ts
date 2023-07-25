import { filterConfigMaps, ConfigMap } from './matches';
import { THREAT_MODEL, SECURITY_LEVEL, ENV, CONFIG, level2int } from '../../model'

function sortMatchingConfigs(matchingConfigs: ConfigMap<ENV>[]): ConfigMap<ENV>[] {
  return matchingConfigs.sort( (conf1, conf2) => level2int[conf1.level as SECURITY_LEVEL] > level2int[conf2.level as SECURITY_LEVEL] ? -1 : 1 );
}

export function assessSecurityLevel<E extends ENV>(threatModel: THREAT_MODEL, policy: SECURITY_LEVEL, env: ENV, config: CONFIG): SECURITY_LEVEL|null {
  const matchingConfigs = filterConfigMaps(threatModel, policy, env, config);
  const sortedMatchingConfigs = sortMatchingConfigs(matchingConfigs);
  return sortedMatchingConfigs.length > 0 ? sortedMatchingConfigs[0].level as SECURITY_LEVEL : null;
}
