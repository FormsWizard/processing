import { syncThreatModel } from '../../model/config/sync/threatmodel-example';
import { syncServerWebrtcPresets } from './presets';
import { deriveState } from './deriveState';
import { SECURITY_LEVEL } from '../..//model';

const defaultPolicy = SECURITY_LEVEL.dubious;  // TODO
const defaultPreset = syncServerWebrtcPresets[0];

export default {
  threatModel: syncThreatModel,
  presets: syncServerWebrtcPresets,
  deriveState: deriveState,
  defaultState: deriveState(syncThreatModel, defaultPolicy, defaultPreset, {})
};
