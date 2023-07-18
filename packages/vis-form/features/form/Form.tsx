import { useCallback } from 'react';

import { JsonForms } from '@jsonforms/react';
import schema from '../table/example-jsonschema.json';

import { useAppSelector, useAppDispatch } from 'state';
import { selectTableData, selectTableState, setRow } from 'state';

import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';


export function Form() {
  const tableData = useAppSelector(selectTableData);
  const { selectedRows } = useAppSelector(selectTableState);
  const dispatch = useAppDispatch();

  const rowIndex = selectedRows && selectedRows.length === 1 ? selectedRows[0] : null;
  const rowData = rowIndex !== null && tableData[rowIndex];

  const onChange = useCallback( ({errors, data}: {errors: any[], data: any}) => {
    if(errors.length === 0) {
      dispatch(setRow([rowIndex, data]));
    }
  }, [dispatch, rowData]);

  return (
    <JsonForms
      renderers={materialRenderers}
      cells={materialCells}
      schema={schema}
      data={rowData}
      onChange={onChange}
    />
  )
}
