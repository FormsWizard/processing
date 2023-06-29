import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'
import { WebrtcProvider } from 'y-webrtc'
//import { WebsocketProvider } from 'y-websocket'
import { bind } from 'redux-yjs-bindings';
import { Store } from '@reduxjs/toolkit';

function createDoc(room: string) {

  const ydoc = new Y.Doc()

  //new IndexeddbPersistence(room, ydoc)

  new WebrtcProvider(room, ydoc, {signaling: ['ws://localhost:4444']})

  //const websocketProvider = new WebsocketProvider(/*'wss://localhost:1234'*/ 'ws://localhost:1234', 'count-demo', ydoc)
  //websocketProvider.on('status', (result: {status: string}) => { console.debug('ws status:', result.status) })

  ydoc.on('update', (_, origin:any) => { console.debug( 'update', room, 'from', (origin?.db && 'db') || (origin?.ws && 'ws') || (origin?.provider.signalingUrls && 'webrtc') || 'local' ) })

  return ydoc
}

export function createAndBind(store: Store, room: string) {
  const ydoc = createDoc(room)
  console.log({ydoc})
  bind(ydoc, store, room);
}
