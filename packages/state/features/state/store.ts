import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { dataReducer } from '../slices/dataSlice';
import { editorStateReducer } from '../slices/editorStateSlice';
import { schemaReducer, keysReducer, cryptedDataReducer } from 'project-state';
import { enhanceReducer } from 'react-redux-yjs';
import * as _ from 'lodash';

export const store = configureStore({
  reducer: {
    data: enhanceReducer(dataReducer, 'data'),
    editorState: enhanceReducer(editorStateReducer, 'editorState'),
    schema: enhanceReducer(schemaReducer, 'schema'),
    keys: enhanceReducer(keysReducer, 'keys'),
    cryptedData: enhanceReducer(cryptedDataReducer, 'cryptedData'),
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
