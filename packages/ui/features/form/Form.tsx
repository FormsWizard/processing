import { JsonForms } from '@jsonforms/react';
import schema from '../table/example-jsonschema.json';

import { useAppSelector } from '../../app/hooks';
import { selectTableData } from '../table/tableSlice';

import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';

export function Form() {
  const tableData = useAppSelector(selectTableData);
  
  return (
    <JsonForms
      renderers={materialRenderers}
      cells={materialCells}
      schema={schema}
      data={tableData[0]}
    />
  )
}
