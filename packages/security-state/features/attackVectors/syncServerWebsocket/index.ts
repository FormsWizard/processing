import { syncThreatModel } from '../../model/config/sync/threatmodel-example';
import { syncServerWebsocketPresets } from './presets';
import { SyncServerWebsocketSettings } from './presets.model';
import { deriveState } from './deriveState';
import { SECURITY_LEVEL } from '../..//model';

const defaultPolicy = SECURITY_LEVEL.dubious;  // TODO
const defaultPreset = syncServerWebsocketPresets[0];

export function defaultSyncState(userSettings: Partial<SyncServerWebsocketSettings>) {
  return deriveState(syncThreatModel, defaultPolicy, defaultPreset, userSettings)
}

export const syncServerWebsocket = {
  threatModel: syncThreatModel,
  presets: syncServerWebsocketPresets,
  deriveState: deriveState,
  defaultState: defaultSyncState({})
};

export default syncServerWebsocket;
