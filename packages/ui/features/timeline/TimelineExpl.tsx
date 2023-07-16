import { useCallback, useMemo } from 'react'

// @ts-ignore
import Timeline from "react-visjs-timeline";
import { DateType, TimelineItem, TimelineOptions } from "vis-timeline";
import { Moment } from 'moment';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { selectTableData, setCell, setRowSelection } from '../table/tableSlice';

import mapping from './example-mapping.json';
import * as _ from 'lodash';

// TODO: - Zeitspanne interaktiv aendern, rechtsklick evtl, event loeschen, neues Event anlegen, Name im Timetable editieren, sortieren in Timeline nach typeVar (groupings),
// TODO: Tabledata show only visible timetabledata, Tabledata show only selected timetabledata visaversa

interface Item extends TimelineItem {
  start: DateType&Moment,
  end: DateType&Moment,
  _rowIdx: number
}

/** Calculate a timeline event from a row of table data **/
function eventFromRow(row: any, index: number) {
  return { id: row.id,
	   content: _.get(row, mapping.content),
	   start: _.get(row, mapping.start),
	   end: _.get(row, mapping.end),
	   _rowIdx: index  /** by keeping the index, during updates we save an O(n) lookup that would be required using the id **/
         }
}

const defaultOptions: TimelineOptions = {
  stack: true,
  horizontalScroll: true,
  zoomable: true,
  zoomKey: 'ctrlKey',
  orientation: { axis: "top" },
  editable: true,
  multiselect: true,
  // timeAxis: { scale: "month", step: 1 },
};

/** Creates an onMove callback to update table data when timeline item was moved.
 *  The time is stored in format of html-input of type datetime-local
 **/
function createOnMove(dispatch: AppDispatch) {
  return (item: Item, callback: any) => {
    /** TODO we could use a reducer, that is setting both dates in one dispatch **/
    dispatch(setCell([item._rowIdx, mapping.start, item.start?.toISOString().slice(0, 19)]));
    dispatch(setCell([item._rowIdx, mapping.end, item.end?.toISOString().slice(0, 19)]));
    callback(item);
  }
}

function createOnSelect(dispatch: AppDispatch, items: Item[]) {
  /** Calc the index of the table rows belonging to the selected timeline items **/
  return (args: {items: number[]}) => {
    /** `args.items` are indices of `items` **/
    const selectedRows = args.items.map(idx => items[idx]._rowIdx);
    dispatch(setRowSelection(selectedRows));
  }
}

export function TimelineExpl() {
  const tableData = useAppSelector(selectTableData);
  const dispatch = useAppDispatch();

  const items = useMemo( () => tableData.map(eventFromRow)
                                        .filter(event => event.start)  /** entries with missing start are not valid **/
                         , [tableData] );

  const onMove = useCallback(createOnMove(dispatch), [dispatch]);
  const onSelect = useCallback(() => createOnSelect(dispatch, items), [dispatch, items]);

  const options = {
    onMove,
    ...defaultOptions
  };

  return (
    <div>
      <Timeline
        options={options}
        items={items}
	selectHandler={onSelect()}
      />
    </div>
  );
}

