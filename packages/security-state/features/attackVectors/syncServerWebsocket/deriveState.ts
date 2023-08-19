import { SYNC, SYNC_enabled, SYNC_protocol, SYNC_e2e_encryption, SYNC_connection_encryption } from '../../model/config/sync/model';
import { SyncServerWebsocketSettings } from './presets.model';
import { assessSecurityLevel } from '../../implementation/config/assess';

function isServerEncrypted(settings: Partial<SyncServerWebsocketSettings>): boolean {
  const url = settings.url || '';
  return url.startsWith('wss://');
}

function deriveSettings(presetSettings: Partial<SyncServerWebsocketSettings>, userSettings: Partial<SyncServerWebsocketSettings>): SyncServerWebsocketSettings {
  const settings = { ...userSettings, ...presetSettings };
  const enabled = presetSettings.enabled || SYNC_enabled.enabled;  // TODO distinct userSettings between current state and explicit new

  return {
    enabled,
    url: enabled === SYNC_enabled.enabled && settings.url || '',
    protocol: SYNC_protocol.websocket,
    e2e_encryption: SYNC_e2e_encryption.off,  // TODO
    connection_encryption: isServerEncrypted(settings) ? SYNC_connection_encryption.tls : SYNC_connection_encryption.off
  }
}

export function deriveState(threatModel: any, policy: any, preset: any, userSettings: Partial<SyncServerWebsocketSettings>): any {
  const { env, settings: presetSettings } = preset;
  const derivedSettings = deriveSettings(presetSettings, userSettings);
  const settings = { ...userSettings, ...presetSettings, ...derivedSettings };
  return { policy,
           preset,
           settings,
           assessment: assessSecurityLevel(threatModel, policy, env, settings)
         }
}
