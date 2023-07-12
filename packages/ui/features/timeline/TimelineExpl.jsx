import { useCallback } from 'react'

import Timeline from "react-visjs-timeline";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setCell, selectTableData } from '../table/tableSlice';

// TODO: - Zeitspanne interaktiv aendern, rechtsklick evtl, event loeschen, neues Event anlegen, Name im Timetable editieren, sortieren in Timeline nach typeVar (groupings),
// TODO: Tabledata show only visible timetabledata, Tabledata show only selected timetabledata visaversa


/** Calculate a timeline event from a row of table data **/
function eventFromRow(row, index) {
  return { id: row.id,
	   content: row.name.lastName,
	   start: row.arrivalDate,
	   end: row.departureDate,
	   _rowIdx: index  /** by keeping the index, during updates we save an O(n) lookup that would be required using the id **/
         }
}

const defaultOptions = {
  stack: true,
  horizontalScroll: true,
  zoomable: true,
  zoomKey: "ctrlKey",
  orientation: { axis: "top" },
  // timeAxis: { scale: "month", step: 1 },
  editable: true,
};

/** Creates an onMove callback to update table data when timeline item was moved **/
function createOnMove(dispatch) {
  return (item, callback) => {
    /** TODO we could use a reducer, that is setting both dates in one dispatch **/
    dispatch(setCell([item._rowIdx, "arrivalDate", item.start?.toISOString()]));
    dispatch(setCell([item._rowIdx, "departureDate", item.end?.toISOString()]));
    callback(item);
  }
}

export function TimelineExpl() {
  const tableData = useAppSelector(selectTableData);
  const dispatch = useAppDispatch();

  const items = tableData.map(eventFromRow)
		         .filter(event => event.start);  /** entries with missing start are not valid **/

  const onMove = useCallback(createOnMove(dispatch), [dispatch]);

  const options = {
    onMove,
    ...defaultOptions
  };

  return (
    <div>
      <Timeline
        options={options}
        items={items}
      />
    </div>
  );
}

