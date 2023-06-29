"use client";

import { useMemo } from 'react';
import { MaterialReactTable, type MRT_Cell } from 'material-react-table';
import * as _ from 'lodash'

import { useAppSelector, useAppDispatch } from './app/hooks';
import { setTableData, setCell, selectTableData, Person } from './features/table/tableSlice';
 
export interface TableProps {
  label?: string;
}

export const Table = ({}: TableProps) => {
  const tableData = useAppSelector(selectTableData);
  const dispatch = useAppDispatch();

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
        size: 200,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
      },
    ],
    [],
  );

//  const [tableData, setTableData] = useState(data);

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
