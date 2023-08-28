"use client";

import { useMemo, useRef } from 'react';
import { MaterialReactTable, MRT_Cell } from 'material-react-table';
import * as _ from 'lodash'

import { useAppSelector, useAppDispatch } from 'state';
import { selectData, setCellData, selectEditorState, setRowSelection, Row } from 'state';

import { selectJsonSchema } from 'project-state';
import { schema2columns } from './schema2columns';

export const Table = () => {
  const tableInstanceRef = useRef(null);

  const tableData = useAppSelector(selectData);
  const tableState = useAppSelector(selectEditorState);
  const dispatch = useAppDispatch();

  const jsonSchema = useAppSelector(selectJsonSchema);
  const columns = useMemo(
    () => jsonSchema && schema2columns(jsonSchema),
    [jsonSchema],
  );

  const handleSaveCell = (cell: MRT_Cell<Row>, value: any) => {
    dispatch(setCellData([cell.row.index, cell.column.id, value]))
  };

  console.log({tableData, tableState})
  return !columns ? <p>Loading Columns from Schema…</p> : (
    <MaterialReactTable
      tableInstanceRef={tableInstanceRef}

      //@ts-ignore
      columns={columns}
      data={tableData}
      state={tableState}

      enableColumnResizing
      enablePinning

      enableEditing
      editingMode="cell"
      muiTableBodyCellEditTextFieldProps={({ cell }) => ({
        onBlur: (event) => {
          //@ts-ignore
          handleSaveCell(cell, event.target.value);
        },
      })}

      muiTableBodyCellProps={({ table, column, cell }) => ({
        onMouseDown: (_event) => {
          dispatch(setRowSelection([cell.row.index]));
        },
        onClick: (_event) => {
          /** like handleDoubleClick of MRT_TableBodyCell **/
          table.setEditingCell(cell);
          queueMicrotask(() => {
            const textField = table.refs.editInputRefs.current[column.id];
            if (textField) {
              textField.focus();
              textField.select?.();
            }
          });
        }
      })}
    />
  );
};
