import { SyncServerWebsocketPreset } from './presets.model';
import { SERVER } from '../../model/environment/model';
import { SYNC_enabled } from '../../model/config/sync/model';
import { CloudOff, Computer, Cloud } from '@mui/icons-material';
import { config } from '@formswizard/config';

export const syncServerWebsocketPresets: SyncServerWebsocketPreset[] = [
  { env: SERVER.trusted,
    settings: { enabled: SYNC_enabled.disabled },
    _ui: { title: 'Offline',
           subtitle: '',
           icon: CloudOff,
	   body: <></>
         }
  },
  { env: SERVER.local,
    settings: { url: 'ws://localhost:1234' },
    _ui: { icon: Computer,
           title: 'Local server',
	   subtitle: 'without tls',
	   body: <>You will have to start the server yourself with the following command: <i>`./node_modules/y-websocket/bin/server.js`</i></>
         }
  },
  { env: SERVER.limited,
    settings: { url: config.server.ws },
    _ui: { title: 'Public Websocket',
           subtitle: 'with tls',
           icon: Cloud,
	   body: <>Configured by the environment variable NEXT_PUBLIC_WS</>
         }
  }
];
