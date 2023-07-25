export enum SERVER { 
  disabled = 'disabled',
  untrusted = 'untrusted',
  limited = 'limited',
  local = 'local',
  trusted = 'trusted',
}

export enum CLIENT {
  untrusted = 'untrusted',
  limited = 'limited',
  trusted = 'trusted'
}

export type ENV = SERVER|CLIENT;
