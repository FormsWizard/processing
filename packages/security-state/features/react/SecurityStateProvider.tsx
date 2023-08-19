import { useReducer, createContext, ReactNode, useContext } from 'react';
import { attackVectors, AttackVectors } from '../attackVectors';
import * as _ from 'lodash';
import { assessSecurityLevel } from '../implementation/config/assess';  // TODO enforce
import {NestCamWiredStandTwoTone} from '@mui/icons-material';

type SecurityState = any;  //TODO

// TODO calc by mapping
export const defaultSecurityState: SecurityState = {
  syncServerDataWebrtc: attackVectors.syncServerDataWebrtc.defaultState,
  syncServerSessionWebrtc: attackVectors.syncServerSessionWebrtc.defaultState,
  syncServerDataWebsocket: attackVectors.syncServerDataWebsocket.defaultState,
  syncServerSessionWebsocket: attackVectors.syncServerSessionWebsocket.defaultState
};

const SecurityStateContext = createContext<SecurityState>({});
const SecurityStateDispatchContext = createContext<any>(null);
export function useSecurityStateContext() {
  return useContext(SecurityStateContext);
};
export function useSecurityStateDispatchContext() {
  return useContext(SecurityStateDispatchContext);
};

export enum ACTIONS {
  selectPreset = 'selectPreset'
}

function reducer(state: SecurityState, action: {attackVector: AttackVectors, type: ACTIONS, payload: any}) {
  const { attackVector, type, payload } = action;
  const index = payload.index;  // we use index instead of the new preset to ensure that only existing presets can be set
  const { threatModel, presets, deriveState } = attackVectors[attackVector];
  const { policy, settings } = state[attackVector];

  switch(type) {
    case ACTIONS.selectPreset:
      const newState = deriveState(threatModel, policy, presets[index], settings);
      state[action.attackVector] = newState;
      return _.clone(state);  // cloning is required to cause a rerendering
    default:
      return state;
  }
}

export function SecurityStateProvider({initialSecurityState, children}: {initialSecurityState?: Partial<SecurityState>, children: ReactNode}) {
  const [state, dispatch] = useReducer(reducer, initialSecurityState||defaultSecurityState)
  return (
    <SecurityStateContext.Provider value={state}>
      <SecurityStateDispatchContext.Provider value={dispatch}>
        {children}
      </SecurityStateDispatchContext.Provider>
    </SecurityStateContext.Provider>
  )
}
