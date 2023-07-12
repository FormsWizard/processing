

import React, { Component } from "react";
import Timeline from "react-visjs-timeline";

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setTableData, setCell, selectTableData, Person } from '../table/tableSlice';

// refer
// https://visjs.github.io/vis-timeline/examples/timeline/basicUsage.html
// manage options:
// https://visjs.github.io/vis-timeline/docs/timeline/#items

// Create a DataSet (allows two way data-binding)
const tlItems = [
  { id: 1, content: "item 1", start: "2014-04-20" },
  { id: 2, content: "item 2", start: "2014-04-14" },
  { id: 3, content: "item 3", start: "2014-04-18" },
  { id: 4, content: "item 4", start: "2014-04-16", end: "2014-04-19" },
  { id: 5, content: "item 5", start: "2014-04-25" },
  { id: 6, content: "item 6", start: "2014-04-27", type: "point" },
  {
    id: 7,
    content: "item 7",
    start: "2014-04-21",
    end: "2014-04-23",
    type: "background"
  }
];

// Configuration for the Timeline
// const tlOptions = {
//   width: "100%",
//   height: "150px",
//   stack: true,
//   editable: true,
//   showMajorLabels: true,
//   showCurrentTime: false,
//   zoomMin: 1000 * 60 * 60,
//   zoomMax: 1000 * 60 * 60 * 2,
//   zoomable: false,
//   horizontalScroll: true,
//   zoomKey: "ctrlKey",
//   orientation: { axis: "top" },
//   // timeAxis: { scale: "minute", step: 5 },
//   selectable: true
// };

const tlOptions = {
  stack: true,
  horizontalScroll: true,
  zoomable: false,
  zoomKey: "ctrlKey",
  orientation: { axis: "top" },
  timeAxis: { scale: "day", step: 1 },
  // editable: true,
  // zoomMin: 1000 * 60 * 60,
  // zoomMax: 1000 * 60 * 60 * 24,
};


function eventFromRow (row) {
  return  {id: row.id,  content: row.name.lastName, start: row.arrivalDate, }
}


export function TimelineExpl () {

  const tableData = useAppSelector(selectTableData);

  const options = tlOptions;
  const items = tableData.map(eventFromRow);

  return(
      <div>
        <h1>Example 1</h1>
        <h4>
          A basic timeline. You can move and zoom the timeline, and select
          items.
        </h4>
        <Timeline
          options={options}
          items={items}
        />
        <div><p>the end</p></div>
      </div>
    );
}

