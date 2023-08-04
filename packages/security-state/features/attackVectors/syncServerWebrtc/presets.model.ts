import { SERVER } from '../../model/environment/model';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { ReactElement } from 'react';
import { SYNC } from '../../model/config/sync/model'

interface UI {
  title: string,
  subtitle?: string,
  icon?: OverridableComponent<any>,
  body?: ReactElement
};

export interface Preset {
  _ui?: UI
};

export type SignalingURL = string;
export type Password = string;

export interface SyncServerWebrtcSettings extends SYNC {
  signaling: SignalingURL[]
  password?: Password
};

export interface SyncServerWebrtcPreset extends Preset {
  env: SERVER,
  settings: Partial<SyncServerWebrtcSettings>
};
