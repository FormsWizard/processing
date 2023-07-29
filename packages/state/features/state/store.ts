import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { enhanceReducer, SET_STATE_FROM_YJS_ACTION } from 'redux-yjs-bindings';
import dataReducer from '../slices/dataSlice';
import editorStateReducer from '../slices/editorStateSlice';
import * as _ from 'lodash';

import { Reducer, Store } from 'redux';
export const enhanceReducerX =
  <S>(currentReducer: Reducer<S>, name: string): Reducer<S> =>
  (state, action) => {
    if (action?.type === SET_STATE_FROM_YJS_ACTION) {
      const validKeys = Object.keys(state||{});  // This implementation expects that initialState already contains all validKeys
      const validPayload: typeof action.payload = _.pickBy(action.payload||{}, (_value, key) => _.includes(validKeys, key));
      //const validPayload = action.payload||{}  // TODO check if the filter is required
      const result = {...state, ...validPayload}
      //console.warn(action.type, name, {state, action, result, validPayload})
      console.assert(Object.keys(validPayload).every( k => Object.keys(state||{}).includes(k) ), {pl: validPayload, state})
      return result
    } else {
      const result = currentReducer(state, action);
      return result
    }
  };

export const store = configureStore({
  reducer: {
//    data: dataReducer,
//    editorState: editorStateReducer
    data: enhanceReducerX(dataReducer, 'data'),
    editorState: enhanceReducerX(editorStateReducer, 'editorState')
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
