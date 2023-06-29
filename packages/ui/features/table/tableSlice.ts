import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import * as _ from 'lodash'

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

export const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];

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
