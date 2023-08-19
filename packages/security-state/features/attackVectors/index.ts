import syncServerWebrtc from './syncServerWebrtc';
import syncServerWebsocket from './syncServerWebsocket';

export const attackVectors = {
//    appServer: SERVER.local,
//    storageServer: SERVER.disabled,
  syncServerDataWebrtc: syncServerWebrtc,
  syncServerSessionWebrtc: syncServerWebrtc,
  syncServerDataWebsocket: syncServerWebsocket,
  syncServerSessionWebsocket: syncServerWebsocket,
//    client: CLIENT.limited  // TODO: default should be untrusted, till confirmed
};

export type AttackVectors = keyof typeof attackVectors;
