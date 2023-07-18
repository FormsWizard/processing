import { TimelineExpl } from 'vis-timeline';

import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import HubIcon from '@mui/icons-material/Hub';
import BarChartIcon from '@mui/icons-material/BarChart';

const notYetImplemented = <p>Not Yet Implemented</p>;

export const tabs = [
  {icon: <PlaceIcon/>, label: "Map", content: notYetImplemented},
  {icon: <CalendarMonthIcon/>, label: "Calendar", content: notYetImplemented},
  {icon: <AccessTimeIcon/>, label: "Timeline", content: <TimelineExpl/>},
  {icon: <ViewWeekIcon/>, label: "Kanban", content: notYetImplemented},
  {icon: <ViewTimelineIcon/>, label: "Gantt", content: notYetImplemented},
  {icon: <HubIcon/>, label: "Network", content: notYetImplemented},
  {icon: <BarChartIcon/>, label: "Chart", content: notYetImplemented}
];
