/** This levels represent possible results of the security assessment and are compared to the project security policy to check if a given configuration is allowed. **/
export enum SECURITY_LEVEL {
  advanced='advanced',
  good='good',
  dubious='dubious',
  insufficient='insufficient'
};

export const level2int = {
  [SECURITY_LEVEL.advanced]: 3,
  [SECURITY_LEVEL.good]: 2,
  [SECURITY_LEVEL.dubious]: 1,
  [SECURITY_LEVEL.insufficient]: 0
};

export function doesResultFitPolicy(result: SECURITY_LEVEL, policy: SECURITY_LEVEL) {
  return level2int[result] >= level2int[policy];
};
