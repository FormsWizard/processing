import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tableReducer from '../table/tableSlice';
import { enhanceReducer } from 'redux-yjs-bindings';

export const store = configureStore({
  reducer: {
    table: enhanceReducer(tableReducer),
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
