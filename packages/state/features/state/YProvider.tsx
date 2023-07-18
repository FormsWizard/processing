import { useReducer, createContext, ReactNode, useContext, useEffect, useMemo } from 'react';

import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { bind } from 'redux-yjs-bindings';

import { store } from '../state/store';

type YState = any;

function createDoc(state: YState) {
  if(!!state.doc) {
    console.warn('existing doc'); 
    return state.doc;
  }
  console.log('new doc');
  const doc = new Y.Doc()
  // @ts-ignore
  doc.on('update', (_, origin:any) => { console.debug( 'update from', (origin?.db && 'db') || (origin?.ws && 'ws') || (origin?.provider.signalingUrls && 'webrtc') || 'local' ) });
  return doc;
}

function connectProvider(state: YState) {
  const { doc, room, webrtcConfig } = state;
  if(!doc) {
    console.warn('YProvider can not be connected without having a doc');
    return null;
  }
  if(!room) {
    console.warn('YProvider can not be connected without setting a room');
    return null;
  }
  if(webrtcConfig) {
    if(state.provider?.webrtc) {
      console.warn('YProvider already connected!');
      return state.provider;  // TODO: disconnect and reconnect instead
    }
    console.log('really connect')
    return { webrtc: new WebrtcProvider(room, doc, webrtcConfig) };  // TODO error handling
  }
}

const ACTIONS = { setWebrtcConfig: 'setWebrtcConfig',
                  setRoom: 'setRoom',
                  createDoc: 'createDoc',
                  setProvider: 'setProvider',
                };

type ActionType = keyof typeof ACTIONS;

function reducer(state: YState, action: {type: ActionType, payload: any}) {
  console.log(action)
  switch(action.type) {
    case ACTIONS.setWebrtcConfig:
      return { 'webrtcConfig': action.payload, ...state };
    case ACTIONS.setRoom:
      return { 'room': action.payload, ...state };
    case ACTIONS.createDoc:
      return { 'doc': createDoc(state), ...state };
    case ACTIONS.setProvider:
      return { 'provider': action.payload, ...state };
    default:
      return state;
  }
}

const YContext = createContext<YState>({});
const YContextDispatch = createContext<any>(null);
export function useYContext() {
  return useContext(YContext);
};
export function useYContextDispatch() {
  return useContext(YContextDispatch);
};

export function YProvider({initialYState, children}: {initialYState?: any, children: ReactNode}) {
  const [state, dispatch] = useReducer(reducer, initialYState)

  return (
    <YContext.Provider value={state}>
      <YContextDispatch.Provider value={dispatch}>
        {children}
      </YContextDispatch.Provider>
    </YContext.Provider>
  )
}

export function TestConsumer() {
  const YState = useYContext();
  console.log('TestConsumer', YState);
  const yStateDispatch = useYContextDispatch();
 
  useEffect(
    () => {
      if(!YState.webrtcConfig) {
        console.debug('set default webrtcConfig');
        yStateDispatch({ type: ACTIONS.setWebrtcConfig, payload: {signaling: ['ws://localhost:4444']} });
      }
      else if(!YState.room) {
        console.debug('set default room');
        yStateDispatch({ type: ACTIONS.setRoom, payload: 'fallbackRoom' });
      }
      else if(!YState.doc) {
	console.debug('create a doc');
        yStateDispatch({ type: ACTIONS.createDoc });
      }
    }, []
  );

  const docGuid = useMemo(() => YState.doc?.guid, [YState.doc])

  useEffect(
    () => {
      if(docGuid)
        console.log('DOC changed', docGuid);
    }, [docGuid]
  );

  useEffect(
    () => {
      if(docGuid) {
        console.log('connect!!!')
	const provider = connectProvider(YState);
        yStateDispatch({ type: ACTIONS.setProvider, payload: provider });
      };
    }, [docGuid, YState.room, YState.webrtcConfig]
  );

  useEffect(
    () => {
      if(docGuid) {
        console.log('bind')
        bind(YState.doc, store, 'table');
	console.log(store)
      };
    }, [docGuid, YState.room]
  );

  return <>{JSON.stringify(Object.keys(YState))}</>
}
