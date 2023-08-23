import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import dataReducer from '../slices/dataSlice';
import editorStateReducer from '../slices/editorStateSlice';
import { enhanceReducer } from 'react-redux-yjs';
import * as _ from 'lodash';

export const store = configureStore({
  reducer: {
    data: enhanceReducer(dataReducer, 'data'),
    editorState: enhanceReducer(editorStateReducer, 'editorState')
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
