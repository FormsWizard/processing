import { SYNC, SYNC_enabled, SYNC_protocol, SYNC_e2e_encryption, SYNC_connection_encryption } from '../../model/config/sync/model';
import { SyncServerWebrtcSettings } from './presets.model';
import { assessSecurityLevel } from '../../implementation/config/assess';

function areAllSignallingServersEncryped(settings: Partial<SyncServerWebrtcSettings>): boolean {
  for( const index in settings.signaling||[] ) {
    const url = settings.signaling && settings.signaling[index];
    if( !url?.startsWith('wss://') )
      return false;
  }
  return Boolean(settings.signaling?.length);
}

function deriveSettings(presetSettings: Partial<SyncServerWebrtcSettings>, userSettings: Partial<SyncServerWebrtcSettings>): SyncServerWebrtcSettings {
  const settings = { ...userSettings, ...presetSettings };
  const enabled = presetSettings.enabled || SYNC_enabled.enabled;  // TODO distinct userSettings between current state and explicit new

  return {
    enabled,
    signaling: enabled === SYNC_enabled.enabled && settings.signaling || [],
    protocol: SYNC_protocol.webrtc,
    //e2e_encryption: SYNC_e2e_encryption.builtin,  // TODO
    e2e_encryption: SYNC_e2e_encryption.off,
    connection_encryption: areAllSignallingServersEncryped(settings) ? SYNC_connection_encryption.tls : SYNC_connection_encryption.off
  }
}

export function deriveState(threatModel: any, policy: any, preset: any, userSettings: Partial<SyncServerWebrtcSettings>): any {
  const { env, settings: presetSettings } = preset;
  const derivedSettings = deriveSettings(presetSettings, userSettings);
  const settings = { ...userSettings, ...presetSettings, ...derivedSettings };
  return { policy,
           preset,
           settings,
           assessment: assessSecurityLevel(threatModel, policy, env, settings)
         }
}
