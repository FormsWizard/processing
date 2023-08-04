import { useReducer, useState, createContext, useContext, useEffect, PropsWithChildren, useMemo } from 'react';

import * as Y from 'yjs';
import * as YWebrtc from 'y-webrtc';
import { Store } from '@reduxjs/toolkit';
import { bind } from 'redux-yjs-bindings';

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
  logging?: boolean | (() => void)
}

export interface YState {
  slices: SliceState[]
}

const YContext = createContext<Partial<YState|undefined>>({});
const YContextDispatch = createContext<any>(null);
export function useYContext() {
  return useContext(YContext);
};
export function useYContextDispatch() {
  return useContext(YContextDispatch);
};

async function hash(message: string) {
  const data = new TextEncoder().encode(message);
  const message_digest = await window.crypto.subtle.digest("SHA-512", data);
  const octets = Array.from(new Uint8Array(message_digest));
  const hex = octets.map(octet => octet.toString(16).padStart(2, "0")).join("");
  return hex;
}

async function configureSliceAsync(yContext: Partial<YState>) {
  await Promise.all((yContext?.slices||[])?.map( async sliceState => {
    const webrtc = sliceState.providers.webrtc;
    if(webrtc) {
      webrtc.room = webrtc.room ||
                   webrtc.options.password && `${sliceState.slice}_${await hash(webrtc.options.password)}` ||
	           sliceState.slice ||
	           crypto.randomUUID();
    }
    return sliceState
  }))
  return yContext;
}

function configureSlice(sliceState: SliceState) {
  sliceState.doc = /*sliceState.doc ||*/ new Y.Doc();
  if(sliceState.logging) {
    const logFn = sliceState.logging === true ? console.log : sliceState.logging;
    sliceState.doc.on('update', (_, origin:any) => { logFn( 'update from', (origin?.db && 'db') || (origin?.ws && 'ws') || (origin?.provider.signalingUrls && 'webrtc') || 'local' ) });
  }

  const webrtc = sliceState.providers.webrtc;
  if(webrtc?.room) {
    webrtc.provider = webrtc.options.signaling && webrtc.options.signaling?.length > 0 &&
     /*webrtc.provider ||*/ new YWebrtc.WebrtcProvider(webrtc.room, sliceState.doc, webrtc.options) || undefined;
  }

  if(sliceState.store && sliceState.slice)
    sliceState.unbind = bind(sliceState.doc, sliceState.store, sliceState.slice);

  return () => { sliceState.unbind && sliceState.unbind();
                 sliceState.providers.webrtc?.provider?.disconnect();
                 sliceState.providers.webrtc?.provider?.destroy(); };
}

export function YConfigurator() {
  const yContext = useYContext();
  //const setYContext = useYContextDispatch();

  useEffect(
    () => {
      if(yContext) {
        const destructors = yContext?.slices?.map( sliceState => configureSlice(sliceState) );
	//setYContext(yContext);
        // TODO use dispatch to set updated sliceStates?
        return () => { destructors?.map( f => f() ) }
      }
    }, [yContext]
  );

  return <></>
}

export interface YProviderProps {
  initialYState: Partial<YState>
}

export function YProvider({children, initialYState}: PropsWithChildren<YProviderProps>) {
  const [state, dispatch] = useState<Partial<YState>>()

  useEffect(
    () => {
      const asyncEffect = async () => {
        dispatch( await configureSliceAsync(initialYState) );
      }
      asyncEffect()
    }, [initialYState]
  );

  return (
    <YContext.Provider value={state}>
      <YContextDispatch.Provider value={dispatch}>
        { state && <YConfigurator/> }
        { children }
      </YContextDispatch.Provider>
    </YContext.Provider>
  )
}
