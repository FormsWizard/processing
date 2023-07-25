import { SECURITY_LEVEL } from '../../policy/level';
import { SERVER } from '../../environment/model';
import { SYNC_connection_encryption, SYNC_e2e_encryption, SYNC_enabled, /*SYNC_protocol*/ } from './model';
import { THREAT_MODEL } from '../threatmodel';

export const syncThreatModel: THREAT_MODEL = {
  [SECURITY_LEVEL.advanced]: {
    '*': [{ enabled: SYNC_enabled.disabled }],
    [SERVER.trusted]: [
      {
        e2e_encryption: SYNC_e2e_encryption.gpg,
        connection_encryption: SYNC_connection_encryption.tls
      }
    ]
  },
  [SECURITY_LEVEL.good]: {
    [SERVER.trusted]: [
      {
        e2e_encryption: SYNC_e2e_encryption.builtin,
        connection_encryption: SYNC_connection_encryption.tls
      }
    ],
    [SERVER.local]: [
      { e2e_encryption: SYNC_e2e_encryption.gpg },
      { e2e_encryption: SYNC_e2e_encryption.builtin }
    ],
    [SERVER.limited]: [
      {
        e2e_encryption: SYNC_e2e_encryption.gpg,
        connection_encryption: SYNC_connection_encryption.tls
      }
    ]
  },
  [SECURITY_LEVEL.dubious]: {
    [SERVER.trusted]: [
      { e2e_encryption: SYNC_e2e_encryption.gpg },
      { e2e_encryption: SYNC_e2e_encryption.builtin },
      { connection_encryption: SYNC_connection_encryption.tls }
    ],
    [SERVER.local]: [{}],
    [SERVER.limited]: [
      {
        e2e_encryption: SYNC_e2e_encryption.builtin,
        connection_encryption: SYNC_connection_encryption.tls
      }
    ],
    [SERVER.untrusted]: [
      {
        e2e_encryption: SYNC_e2e_encryption.gpg,
        connection_encryption: SYNC_connection_encryption.tls
      }
    ]
  },
  [SECURITY_LEVEL.insufficient]: {
    [SERVER.untrusted]: [
      {
        e2e_encryption: SYNC_e2e_encryption.builtin,
        connection_encryption: SYNC_connection_encryption.tls
      }
    ]
  }
}
