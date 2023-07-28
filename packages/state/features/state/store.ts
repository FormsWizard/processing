import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { enhanceReducer, SET_STATE_FROM_YJS_ACTION } from 'redux-yjs-bindings';
import dataReducer from '../slices/dataSlice';
import editorStateReducer from '../slices/editorStateSlice';

import { Reducer, Store } from 'redux';
export const enhanceReducerX =
  <S>(currentReducer: Reducer<S>, name: string): Reducer<S> =>
  (state, action) => {
    if (action?.type === SET_STATE_FROM_YJS_ACTION) {
      //return action.payload === undefined ? state : action.payload;
      const result = {...state, ...action.payload}
      //console.warn(action.type, name, {state, action, result})
      return result
    } else {
      const result = currentReducer(state, action);
      //console.warn(action.type, name, {state, action, result})
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
