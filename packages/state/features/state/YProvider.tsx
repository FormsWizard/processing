import { useReducer, createContext, ReactNode, useContext, useEffect, useMemo, PropsWithChildren } from 'react';

import * as Y from 'yjs';
import * as YWebrtc from 'y-webrtc';
import { Store } from '@reduxjs/toolkit';
import { bind } from 'redux-yjs-bindings';

import { store } from '../state/store';

interface WebrtcProvider {
  provider?: YWebrtc.WebrtcProvider
  options: YWebrtc.ProviderOptions
  room?: string  // defaults to sliceState.slice
}

interface Providers {
  webrtc?: WebrtcProvider
}

export interface SliceState {
  doc?: Y.Doc
  providers: Providers
  store?: Store
  slice?: string
  unbind?: () => void
}

interface YState {
  slices: SliceState[]
}

const ACTIONS = {};

type ActionType = keyof typeof ACTIONS;

function reducer(state: Partial<YState>, action: {type: ActionType, payload: any}) {
  switch(action.type) {
    default:
      return state;
  }
}

const YContext = createContext<Partial<YState>>({});
const YContextDispatch = createContext<any>(null);
export function useYContext() {
  return useContext(YContext);
};
export function useYContextDispatch() {
  return useContext(YContextDispatch);
};

function configureSlice(sliceState: SliceState) {
  console.log({sliceState})
  sliceState.doc = sliceState.doc || new Y.Doc();
  sliceState.doc.on('update', (_, origin:any) => { console.debug( 'update from', (origin?.db && 'db') || (origin?.ws && 'ws') || (origin?.provider.signalingUrls && 'webrtc') || 'local' ) });

  const webrtc = sliceState.providers.webrtc;
  if(webrtc) {
    webrtc.room = webrtc.room || sliceState.slice || crypto.randomUUID();
    webrtc.provider = /*webrtc.provider ||*/ new YWebrtc.WebrtcProvider(webrtc.room, sliceState.doc, webrtc.options);
  }

  if(sliceState.store && sliceState.slice)
    sliceState.unbind = bind(sliceState.doc, sliceState.store, sliceState.slice);

  return () => { sliceState.unbind && sliceState.unbind();
                 sliceState.providers.webrtc?.provider?.destroy(); };
}

export function YConfigurator() {
  const yContext = useYContext();

  useEffect(
    () => {
      const destructors = yContext.slices?.map( sliceState => configureSlice(sliceState) );
      // TODO use dispatch to set updated sliceStates?
      return () => { destructors?.map( f => f() ) }
    }, []
  );

  return <></>
}

interface YProviderProps {
  initialYState: Partial<YState>
}

export function YProvider({children, initialYState}: PropsWithChildren<YProviderProps>) {
  const [state, dispatch] = useReducer(reducer, initialYState)

  return (
    <YContext.Provider value={state}>
      <YContextDispatch.Provider value={dispatch}>
        <YConfigurator/>
        {children}
      </YContextDispatch.Provider>
    </YContext.Provider>
  )
}
