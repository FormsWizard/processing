import { SyncServerWebrtcPreset } from './presets.model';
import { SERVER } from '../../model/environment/model';
import { SYNC_enabled } from '../../model/config/sync/model';
import { Computer, Cloud, CloudOff } from '@mui/icons-material';

export const syncServerWebrtcPresets: SyncServerWebrtcPreset[] = [
  { env: SERVER.trusted,
    settings: { enabled: SYNC_enabled.disabled },
    _ui: { title: 'Offline',
           subtitle: '',
           icon: CloudOff,
	   body: <></>
         }
  },
  { env: SERVER.local,
    settings: { signaling: ['ws://localhost:4444'] },
    _ui: { icon: Computer,
           title: 'Local signaling',
	   subtitle: 'without tls',
	   body: <>You will have to start the server yourself with the following command: <i>`./node_modules/y-webrtc/bin/server.js`</i></>
         }
  },
  { env: SERVER.trusted,
    settings: { signaling: ['wss://yjs.winzlieb.eu'] },
    _ui: { title: 'Public signaling',
           subtitle: 'with tls',
           icon: Cloud,
	   body: <>No additional effort required.</>
         }
  }
];
