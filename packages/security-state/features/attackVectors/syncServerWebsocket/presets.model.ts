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

export type URL = string;

export interface SyncServerWebsocketSettings extends SYNC {
  url: URL
};

export interface SyncServerWebsocketPreset extends Preset {
  env: SERVER,
  settings: Partial<SyncServerWebsocketSettings>
};
