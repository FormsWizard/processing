import { syncThreatModel } from '../../model/config/sync/threatmodel-example';
import { syncServerWebrtcPresets } from './presets';
import { SyncServerWebrtcSettings } from './presets.model';
import { deriveState } from './deriveState';
import { SECURITY_LEVEL } from '../..//model';

const defaultPolicy = SECURITY_LEVEL.dubious;  // TODO
const defaultPreset = syncServerWebrtcPresets[1];

export function defaultSyncState(userSettings: Partial<SyncServerWebrtcSettings>) {
  return deriveState(syncThreatModel, defaultPolicy, defaultPreset, userSettings)
}

export const syncServerWebrtc = {
  threatModel: syncThreatModel,
  presets: syncServerWebrtcPresets,
  deriveState: deriveState,
  defaultState: defaultSyncState({})
};

export default syncServerWebrtc;
