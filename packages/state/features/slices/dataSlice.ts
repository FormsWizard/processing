import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../state/store";
import * as _ from "lodash";

export interface Row extends Object {
  id: string
}

export interface DataState {
  data: Row[];
}

const initialState: DataState = {
  data: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setTableData: (state, action: PayloadAction<Row[]>) => {
      state.data = action.payload;
    },
    setRowData: (state, action: PayloadAction<{row: Row, rowIndex?: number}>) => {
      /** `rowIndex` should be used as optional hint for better performance whenever possible **/
      const {row, rowIndex} = action.payload;

      const checkedRowIndex = rowIndex && state.data[rowIndex].id == row.id ?
	                        rowIndex :
				rowIndex && console.error('setRowData failed because of non-matching id!');

      const searchedRowIndex = state.data.findIndex(r => r.id == row.id);
      const nextRowIndex = state.data.length;
      state.data[checkedRowIndex || (searchedRowIndex != -1 ? searchedRowIndex : nextRowIndex)] = row;
    },
    setCellData: (state, action: PayloadAction<any>) => {
      const [rowIndex, columnId, newValue] = action.payload;
      _.set(state.data[rowIndex], columnId, newValue);
    }
  },
});

export const { setTableData, setRowData, setCellData } = dataSlice.actions;

export const selectData = (state: RootState) =>
  // @ts-ignore
  state.data.data || initialState.data;

export const dataReducer = dataSlice.reducer;
