import syncServerWebrtc from './syncServerWebrtc';

export const attackVectors = {
//    appServer: SERVER.local,
//    storageServer: SERVER.disabled,
  syncServerWebrtc
//    syncServerWebsocket: SERVER.disabled,
//    client: CLIENT.limited  // TODO: default should be untrusted, till confirmed
};

export type AttackVectors = keyof typeof attackVectors;
