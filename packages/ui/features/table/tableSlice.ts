import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
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

export type SelectedRows = number[];

export interface tweakedTanstackTableState extends MRT_TableState {
  /** TanstackTable uses a RowSelectionState of type Record<string, boolean>.
   *  For us it is more efficient to keep the indices of selectedRows as number[].
   *  We ensure that rowSelection of TanstackTable/MRT is also available and always in sync with selectedRows by calculating it within the reducer setRowSelection.
   **/
  selectedRows: SelectedRows;
};

export interface TableState {
  data: Person[];
  state: Partial<tweakedTanstackTableState>;
}

const initialState: TableState = {
  data,
  state: { selectedRows: [],
           rowSelection: {}
         }
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setTableData: (state, action: PayloadAction<Person[]>) => {
      state.data = action.payload;
    },
    setRow: (state, action: PayloadAction<any>) => {
      const [rowIndex, newValue] = action.payload;
      var tableDataClone = _.cloneDeep(state.data)
      tableDataClone[rowIndex] = newValue;
      state.data = tableDataClone;
    },
    setCell: (state, action: PayloadAction<any>) => {
      const [rowIndex, columnId, newValue] = action.payload;
      var tableDataClone = _.cloneDeep(state.data)
      _.set(tableDataClone[rowIndex], columnId, newValue);
      state.data = tableDataClone;
    },
    setRowSelection: (state, action: PayloadAction<SelectedRows>) => {
      const selectedRows = action.payload;
      const rowSelection = Object.fromEntries(selectedRows.map(i => [i, true]));
      state.state = { ...state.state,
	              selectedRows,
	              rowSelection
                    };
    }
  }
});

export const { setTableData, setRow, setCell, setRowSelection } = tableSlice.actions;

export const selectTableData = (state: RootState) => state.table.data || initialState.data;

export const selectTableState = (state: RootState) => state.table.state || initialState.state;

export default tableSlice.reducer;
