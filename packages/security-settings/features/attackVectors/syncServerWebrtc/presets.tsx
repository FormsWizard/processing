import { SyncServerWebrtcPreset } from './presets.model';
import { SERVER } from '../../model/environment/model';
import ComputerIcon from '@mui/icons-material/Computer';
import CloudIcon from '@mui/icons-material/Cloud';

export const syncServerWebrtcPresets: SyncServerWebrtcPreset[] = [
  { env: SERVER.local,
    settings: { signaling: ['ws://localhost:4444'] },
    _ui: { icon: ComputerIcon,
           title: 'Local signaling',
	   subtitle: 'without tls',
	   body: <>You will have to start the server yourself with the following command: <i>`./node_modules/y-webrtc/bin/server.js`</i></>
         }
  },
  { env: SERVER.untrusted,
    settings: { signaling: ['wss://signaling.yjs.dev',
                            'wss://y-webrtc-signaling-eu.herokuapp.com',
                            'wss://y-webrtc-signaling-us.herokuapp.com'] },
    _ui: { title: 'Public signaling',
           subtitle: 'Y-Webrtc servers',
           icon: CloudIcon,
	   body: <>No additional effort required.</>
         }
  }
];
