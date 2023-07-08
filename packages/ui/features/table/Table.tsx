"use client";

import { useMemo } from 'react';
import { MaterialReactTable, type MRT_Cell } from 'material-react-table';
import * as _ from 'lodash'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setTableData, setCell, selectTableData, Person } from './tableSlice';

import example_columns from './example-columns.json'

export interface TableProps {
  label?: string;
}

export const Table = ({}: TableProps) => {
  const tableData = useAppSelector(selectTableData);
  const dispatch = useAppDispatch();

  const columns = useMemo(
    () => example_columns,
    [],
  );

  const handleSaveCell = (cell: MRT_Cell<Person>, value: any) => {
    dispatch(setCell([tableData, cell.row.index, cell.column.id, value]))
  };

  return <MaterialReactTable
           //@ts-ignore
           columns={columns}
           data={tableData}
           enableEditing
           editingMode="cell"
           muiTableBodyCellEditTextFieldProps={({ cell }) => ({
             onBlur: (event) => {
               //@ts-ignore
               handleSaveCell(cell, event.target.value);
             },
           })}
         />;
};
