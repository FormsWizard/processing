import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { MRT_TableState, MRT_RowSelectionState } from 'material-react-table';
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
  state: Partial<MRT_TableState>;
}

const initialState: TableState = {
  data,
  state: {rowSelection: {}}
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTableData: (state, action: PayloadAction<Person[]>) => {
      state.data = action.payload;
    },
    setCell: (state, action: PayloadAction<any>) => {
      const [rowIndex, columnId, newValue] = action.payload;
      var tableDataClone = _.cloneDeep(state.data)
      _.set(tableDataClone[rowIndex], columnId, newValue);
      state.data = tableDataClone;
    },
    setRowSelection: (state, action: PayloadAction<MRT_RowSelectionState>) => {
      const rowSelection = action.payload;
      state.state = {...state.state, rowSelection}
    }
  }
});

export const { setTableData, setCell, setRowSelection } = tableSlice.actions;

export const selectTableData = (state: RootState) => state.table.data || initialState.data;
export const selectTableState = (state: RootState) => state.table.state || initialState.state;

export default tableSlice.reducer;
