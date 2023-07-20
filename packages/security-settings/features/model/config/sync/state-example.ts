import { SYNC, SYNC_enabled, SYNC_protocol, SYNC_e2e_encryption, SYNC_connection_encryption } from './model'

export const syncConfig: SYNC = {
  enabled: SYNC_enabled.enabled,
  protocol: SYNC_protocol.webrtc,
  e2e_encryption: SYNC_e2e_encryption.builtin,
  connection_encryption: SYNC_connection_encryption.off
};

