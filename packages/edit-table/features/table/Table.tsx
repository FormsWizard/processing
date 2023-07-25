"use client";

import { useMemo, useRef } from 'react';
import { MaterialReactTable, MRT_Cell } from 'material-react-table';
import * as _ from 'lodash'

import { useAppSelector, useAppDispatch } from 'state';
import { selectData, setCellData, selectEditorState, setRowSelection, Person } from 'state';

import example_columns from './example-columns.json'

export const Table = () => {
  const tableInstanceRef = useRef(null);
  //console.log(tableInstanceRef)

  const tableData = useAppSelector(selectData);
  const tableState = useAppSelector(selectEditorState);
  const dispatch = useAppDispatch();

  const columns = useMemo(
    () => example_columns,
    [],
  );

  const handleSaveCell = (cell: MRT_Cell<Person>, value: any) => {
    dispatch(setCellData([cell.row.index, cell.column.id, value]))
  };

  return <MaterialReactTable
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
         />;
};
