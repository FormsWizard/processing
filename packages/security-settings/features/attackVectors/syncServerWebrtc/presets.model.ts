import { SERVER } from '../../model/environment/model';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { ReactElement } from 'react';

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

export interface SyncServerWebrtcSettings {
  signaling: SignalingURL[]
};

export interface SyncServerWebrtcPreset extends Preset {
  env: SERVER,
  settings: SyncServerWebrtcSettings
};
