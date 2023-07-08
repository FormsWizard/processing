"use client";

import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { Table, TableProps } from './Table';

export const TableWithProvider = ({
  label = "Foo",
}: TableProps) => {

  return <Provider store={store}>
           <Table/>
         </Provider>;
};
