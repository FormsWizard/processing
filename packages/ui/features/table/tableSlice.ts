import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import * as _ from 'lodash';

import data from './example-data.json';

type Name = {
  firstName: string;
  lastName: string;
};

export type Person = {
  name: Name;
  address: string;
  state: string;
  phoneNumber?: string;
};

export interface TableState {
  data: Person[];
}

const initialState: TableState = {
  data
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTableData: (state, action: PayloadAction<Person[]>) => {
      state.data = action.payload;
    },
    setCell: (state, action: PayloadAction<any>) => {
      const [tableData, rowIndex, columnId, newValue] = action.payload;
      var tableDataClone = _.cloneDeep(tableData)
      _.set(tableDataClone[rowIndex], columnId, newValue);
      state.data = tableDataClone;
    }
  }
});

export const { setTableData, setCell } = tableSlice.actions;

export const selectTableData = (state: RootState) => state.table.data || initialState.data;

export default tableSlice.reducer;
