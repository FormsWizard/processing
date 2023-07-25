import { useCallback, useMemo } from "react";

// @ts-ignore
// import Timeline from "react-visjs-timeline";
import VisTimelineWrapper from "./visTimelineWrapper/VisTimelineWrapper";

import {
  DataGroupCollectionType,
  DateType,
  IdType,
  Timeline as TimelineType,
  TimelineItem,
  TimelineOptions,
} from "vis-timeline/types";
import { useAppSelector, useAppDispatch } from "state";
import { AppDispatch } from "state";
import { selectData, setCellData, setRowSelection } from "state";

import mapping from "./example-mapping.json";
import * as _ from "lodash";

import { Moment } from 'moment';

// TODO: - Zeitspanne interaktiv aendern, rechtsklick evtl, event loeschen, neues Event anlegen, Name im Timetable editieren, sortieren in Timeline nach typeVar (groupings),
// TODO: Tabledata show only visible timetabledata, Tabledata show only selected timetabledata visaversa

interface Item extends TimelineItem {
  start: DateType&Moment;
  end: DateType&Moment;
  _rowIdx: number;
}

/** Calculate a timeline event from a row of table data **/
function eventFromRow(row: any, index: number) {
  return {
    id: row.id,
    content: _.get(row, mapping.content),
    start: _.get(row, mapping.start),
    end: _.get(row, mapping.end),
    _rowIdx:
      index /** by keeping the index, during updates we save an O(n) lookup that would be required using the id **/,
  };
}

const defaultOptions: TimelineOptions = {
  stack: true,
  horizontalScroll: true,
  zoomable: true,
  zoomKey: "ctrlKey",
  orientation: { axis: "top" },
  editable: true,
  multiselect: true,
  timeAxis: { scale: "month", step: 1 },
};

/** Creates an onMove callback to update table data when timeline item was moved.
 *  The time is stored in format of html-input of type datetime-local
 **/
function handleMove(dispatch: AppDispatch, item: Item, callback: any) {
  console.log(item);
  /** TODO we could use a reducer, that is setting both dates in one dispatch **/
  dispatch(
    setCellData([
      item._rowIdx,
      mapping.start,
      item.start?.toISOString().slice(0, 19),
    ])
  );
  dispatch(
    setCellData([item._rowIdx, mapping.end, item.end?.toISOString().slice(0, 19)])
  );
  callback(item);
}

function handleSelect(
  dispatch: AppDispatch,
  selectionArgs: { items: number[] },
  items: Item[]
) {
  console.log(selectionArgs, items);
  /** Calc the index of the table rows belonging to the selected timeline items **/

  /** `args.items` are indices of `items` **/
  const selectedRows = selectionArgs.items.map((idx) => items[idx]._rowIdx);
  dispatch(setRowSelection(selectedRows));
}

export function TimelineExpl() {
  const tableData = useAppSelector(selectData);
  const dispatch = useAppDispatch();

  const items = useMemo(
    () =>
      tableData
        .map(eventFromRow)
        .filter(
          (event) => event.start
        ) /** entries with missing start are not valid **/,
    [tableData]
  );

  const onMove = useCallback(
    (item: Item, callback: any) => handleMove(dispatch, item, callback),
    [dispatch]
  );
  const onSelect = useCallback(
    (selectionArgs: { items: number[] }) =>
      handleSelect(dispatch, selectionArgs, items),
    [dispatch, items]
  );

  const options = {
    onMove,
    ...defaultOptions,
  };

  return (
    <div>
      <VisTimelineWrapper options={options} items={items} onSelect={onSelect} />
    </div>
  );
}
