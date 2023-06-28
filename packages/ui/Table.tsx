"use client";

import React, { useState, useMemo } from 'react';
import { MaterialReactTable, type MRT_Cell } from 'material-react-table';
import * as _ from 'lodash'

type Person = {
  firstName: string;
  lastName: string;
  address: string;
  state: string;
  phoneNumber: string;
};

const data = [
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


interface Props {
  label?: string;
}
 
export const Table = ({
  label = "Foo",
}: Props) => {
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

  const [tableData, setTableData] = useState(data);

  const handleSaveCell = (cell: MRT_Cell<Person>, value: any) => {
    _.set(tableData[cell.row.index], cell.column.id, value)  // allows cell.column.id to be an accessorKey of nested Data
    setTableData([...tableData]);
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
