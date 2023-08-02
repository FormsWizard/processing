import type { Meta, StoryObj } from '@storybook/react';
import { ConnectionIndicator } from './ConnectionIndicator';

const meta = {
  title: 'secured-react-redux-yjs/ConnectionIndicator',
  component: ConnectionIndicator,
} satisfies Meta<typeof ConnectionIndicator>;
export default meta;

export const Offline: StoryObj<typeof meta> = {
  args: { fakeOnline: 0 }
};

export const Isolated: StoryObj<typeof meta> = {
  args: { fakeOnline: 1 }
};

export const Connected: StoryObj<typeof meta> = {
  args: { fakeOnline: 42 }
};
