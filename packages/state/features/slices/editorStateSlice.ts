import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../state/store";
import { MRT_TableState } from "material-react-table";

export type SelectedRows = number[];

export interface tweakedTanstackTableState extends MRT_TableState {
  /** TanstackTable uses a RowSelectionState of type Record<string, boolean>.
   *  For us it is more efficient to keep the indices of selectedRows as number[].
   *  We ensure that rowSelection of TanstackTable/MRT is also available and always in sync with selectedRows by calculating it within the reducer setRowSelection.
   **/
  selectedRows: SelectedRows;
}

export type EditorState = Partial<tweakedTanstackTableState>;

const initialState: EditorState = { selectedRows: [], rowSelection: {} };

export const editorStateSlice = createSlice({
  name: "editorState",
  initialState,
  reducers: {
    setRowSelection: (state, action: PayloadAction<SelectedRows>) => {
      const selectedRows = action.payload;
      state.rowSelection = Object.fromEntries(
        selectedRows.map((i) => [i, true])
      );
      state.selectedRows = selectedRows;
    },
  },
});

export const { setRowSelection } =
  editorStateSlice.actions;

export const selectEditorState = (state: RootState) =>
  state.editorState || initialState;

export default editorStateSlice.reducer;
