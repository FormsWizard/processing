import { useCallback, useMemo } from "react";

// @ts-ignore
// import Timeline from "react-visjs-timeline";
import VisKanbanWrapper from "./visKanbanWrapper/VisKanbanWrapper";




import { useAppSelector, useAppDispatch } from "state";
import { AppDispatch } from "state";
import { selectTableData, setCell, setRowSelection } from "state";

import mapping from "./example-mapping.json";
import * as _ from "lodash";


// add interface?


export function Kanban() {
  return ( <div> anpassen: {/* <VisKanbanWrapper options={options} items={items} onSelect={onSelect} /> */} </div>
  );
}
