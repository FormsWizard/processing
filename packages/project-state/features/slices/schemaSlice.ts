import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../state/store";
import { JsonSchema, UISchemaElement } from '@jsonforms/core'

export interface SchemaState {
  jsonSchema?: JsonSchema
  uiSchema?: UISchemaElement
}

const initialState: SchemaState = {
  jsonSchema: undefined,
  uiSchema: undefined
};

export const schemaSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setJsonSchema: (state: SchemaState, action: PayloadAction<JsonSchema>) => {
      state.jsonSchema = action.payload;
    },
    setUiSchema: (state: SchemaState, action: PayloadAction<UISchemaElement>) => {
      state.uiSchema = action.payload;
    },
    setSchemaState: (state: SchemaState, action: PayloadAction<SchemaState>) => {
      state = {...state, ...action.payload};
    }
  }
});

export const { setJsonSchema, setUiSchema, setSchemaState } = schemaSlice.actions;

export const selectJsonSchema = (state: RootState) => state.schema.jsonSchema || initialState.jsonSchema;
export const selectUiSchema = (state: RootState) => state.schema.uiSchema || initialState.uiSchema;

export const schemaReducer = schemaSlice.reducer;
