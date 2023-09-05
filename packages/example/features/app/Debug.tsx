import * as React from 'react';
import { useAppSelector, selectData, selectEditorState, useAppDispatch, setRowData } from 'state';
import { selectJsonSchema, selectUiSchema } from 'project-state';

export function Print({json={}}: {json: any}) {
  const key = Object.keys(json).length === 1 && Object.keys(json)[0]
  const data = !key ? json : Object.values(json)[0];

  const indentation = '  ';
  return <>
    <h4>{key}</h4>
    <p>
      { JSON.stringify(data, undefined, indentation).split('\n').map(
          line => <>{ line.split(indentation).map( token => <span>{token} &nbsp; </span> ) }<br/></>
        )
      }
    </p>
  </>
}

export function Debug() {
  const schema = useAppSelector(selectJsonSchema);
  const uiSchema = useAppSelector(selectUiSchema);
  const tableData = useAppSelector(selectData);

  return <div>
    <Print json={{schema}}/>
    <Print json={{uiSchema}}/>
    <Print json={{tableData}}/>
  </div>
}
