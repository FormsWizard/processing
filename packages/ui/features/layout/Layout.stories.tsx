import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';

import PlaceIcon from '@mui/icons-material/Place';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
//import BarChartIcon from '@mui/icons-material/BarChart';

const meta = {
  title: 'Layout',
  component: Layout
} satisfies Meta<typeof Layout>;
export default meta;

const anyReactElement = <i>anyReactElement</i>;
const tabs = [{icon: <PlaceIcon/>, label: "Map", content: anyReactElement},
	      {icon: <CalendarMonthIcon/>, label: "Calendar", content: anyReactElement},
              {icon: <AccessTimeIcon/>, label: "Timeline", content: anyReactElement}];

export const Story: StoryObj<typeof meta> = {
  args: {
    title: 'A minimal example of using the Layout implemented for the processing component of FormsWizard',
    drawer: anyReactElement,
    tabs,
    children: anyReactElement
  },
};
