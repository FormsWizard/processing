import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../state/store";
import * as _ from "lodash";
import data from "../example/example-data.json";

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

export interface DataState {
  data: Person[];
}

const initialState: DataState = {
  data,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setTableData: (state, action: PayloadAction<Person[]>) => {
      state.data = action.payload;
    },
    setRowData: (state, action: PayloadAction<any>) => {
      const [rowIndex, newValue] = action.payload;
      state.data[rowIndex] = newValue;
    },
    setCellData: (state, action: PayloadAction<any>) => {
      const [rowIndex, columnId, newValue] = action.payload;
      _.set(state.data[rowIndex], columnId, newValue);
    }
  },
});

export const { setTableData, setRowData, setCellData } =
  dataSlice.actions;

export const selectData = (state: RootState) =>
  // @ts-ignore
  state.data.data || initialState.data;

export default dataSlice.reducer;
