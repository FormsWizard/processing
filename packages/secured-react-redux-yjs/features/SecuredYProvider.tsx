import { PropsWithChildren } from 'react';
import { YProvider, YState } from "react-redux-yjs";
import { useSecurityStateContext } from 'security-state';
import { Store } from '@reduxjs/toolkit';

interface Props {
  store: Store
}

export function SecuredYProvider({children, store}: PropsWithChildren<Props>) {
  const securityState = useSecurityStateContext();

  const initialYState: Partial<YState> = {slices: [{store, slice: 'data', //logging: true,
                                                    providers: {webrtc: {options: {signaling: securityState.syncServerSessionWebrtc.settings.signaling,  // TOOD till now all need share the same
                                                                                   password: securityState.syncServerDataWebrtc.settings.password}},
                                                                websocket: {url: securityState.syncServerSessionWebsocket.settings.url}}},
                                                   {store, slice: 'editorState',
                                                    providers: {webrtc: {options: {signaling: securityState.syncServerSessionWebrtc.settings.signaling ,
                                                                                   password: securityState.syncServerSessionWebrtc.settings.password}},
                                                                websocket: {url: securityState.syncServerSessionWebsocket.settings.url}}},
                                                   {store, slice: 'schema', logging: true,  // TODO
                                                    providers: {webrtc: {options: {signaling: ['wss://yjs.winzlieb.eu'],
                                                                                   password: 'TODO'}},
                                                                websocket: {url: 'wss://mqtt.afg.mission-lifeline.de'}}},
                                                   {store, slice: 'keys', logging: true,
                                                    providers: {webrtc: {options: {signaling: ['wss://yjs.winzlieb.eu'],
                                                                                   password: 'TODO'}},
                                                                websocket: {url: 'wss://mqtt.afg.mission-lifeline.de'}}},
                                                   {store, slice: 'cryptedData', logging: true,
                                                    providers: {webrtc: {options: {signaling: ['wss://yjs.winzlieb.eu'],
                                                                                   password: 'TODO'}},
                                                                websocket: {url: 'wss://mqtt.afg.mission-lifeline.de'}}} ]}

  return (
    <YProvider initialYState={initialYState}>
      {children}
    </YProvider>
  )
}
