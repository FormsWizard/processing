import { SERVER, CLIENT } from './model';

export const environment = {
  appServer: SERVER.local,
  storageServer: SERVER.disabled,
  syncServer: { webrtc: SERVER.local,
                websocket: SERVER.disabled },
  client: CLIENT.limited  // TODO: default should be untrusted, till confirmed
}
