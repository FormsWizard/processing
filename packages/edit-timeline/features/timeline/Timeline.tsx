import { useCallback, useMemo } from "react";
import { selectJsonSchema, selectUiSchema } from 'project-state';
import { schema2mapping } from './schema2mapping';

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
  TimelineOptionsItemCallbackFunction
} from "vis-timeline/types";
import { useAppSelector, useAppDispatch } from "state";
import { AppDispatch } from "state";
import { selectData, setCellData, setRowSelection, Row } from "state";
import * as _ from "lodash";
import { Moment } from 'moment';

// TODO: - Zeitspanne interaktiv aendern, rechtsklick evtl, event loeschen, neues Event anlegen, Name im Timetable editieren, sortieren in Timeline nach typeVar (groupings),
// TODO: Tabledata show only visible timetabledata, Tabledata show only selected timetabledata visaversa

interface Item extends TimelineItem {
  start: DateType&Moment;
  end: DateType&Moment;
  _rowIdx: number;
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

export function Timeline() {
  const tableData = useAppSelector(selectData);
  const dispatch = useAppDispatch();

  const jsonSchema = useAppSelector(selectJsonSchema);
  const uiSchema = useAppSelector(selectUiSchema);

  const mapping = useMemo(
    () => jsonSchema && schema2mapping(jsonSchema, uiSchema),
    [jsonSchema, uiSchema],
  );

  /** Calculate a timeline event from a row of table data **/
  const eventFromRow = useCallback( (row: Row, index: number) => (
    mapping && {
      id: row.id,
      content: _.get(row, mapping.content),
      start: _.get(row, mapping.start),
      end: _.get(row, mapping.end),
      _rowIdx: index /** by keeping the index, during updates we save an O(n) lookup that would be required using the id **/,
    }
  ), [mapping])

  const items: Item[] = useMemo(
    () =>
      tableData
        .map(eventFromRow)
        .filter(
          (event) => event && event.start
        ) /** entries with missing start are not valid **/
	.map(event => event as Item),
    [tableData]
  );
  console.log({tableData, mapping, items})

  const handleMove = useCallback( (dispatch: AppDispatch, item: Item, callback: any) => {
    /** TODO we could use a reducer, that is setting both dates in one dispatch **/
    mapping && dispatch(
      setCellData([item._rowIdx, mapping.start, item.start?.toISOString().slice(0, 19)])
    );
    mapping && dispatch(
      setCellData([item._rowIdx, mapping.end, item.end?.toISOString().slice(0, 19)])
    );
    callback(item);
  } ,[mapping])


  const onMove: TimelineOptionsItemCallbackFunction = useCallback(
    (item: TimelineItem, callback: any) => handleMove(dispatch, item as Item, callback),
    [dispatch]
  );
  const onSelect = useCallback(
    (selectionArgs: { items: number[] }) =>
      items && handleSelect(dispatch, selectionArgs, items),
    [dispatch, items]
  );

  const options = {
    onMove,
    ...defaultOptions,
  };

  return items && (
    <div>
      <VisTimelineWrapper options={options} items={items} onSelect={onSelect} />
    </div>
  );
}
