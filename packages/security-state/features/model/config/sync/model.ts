export enum SYNC_enabled {
  disabled = 'disabled',
  enabled = 'enabled'
}

export enum SYNC_protocol {
  webrtc = 'webrtc',
  websocket = 'websocket'
};

export enum SYNC_e2e_encryption {
  gpg = 'gpg',
  builtin = 'builtin',
  off = 'off'
}

export enum SYNC_connection_encryption {
  tls = 'tls',
  off = 'off'
}

export interface SYNC {
  enabled: SYNC_enabled,
  protocol: SYNC_protocol,
  e2e_encryption: SYNC_e2e_encryption,
  connection_encryption: SYNC_connection_encryption
};
