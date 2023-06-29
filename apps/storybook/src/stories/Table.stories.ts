import type { Meta, StoryObj } from '@storybook/react';

import { TableWithProvider } from 'ui';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Example/Table',
  component: TableWithProvider,
  tags: ['autodocs'],
} satisfies Meta<typeof TableWithProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Trivial: Story = {
  args: {
    label: 'FOOOOOOOOO'
  },
};
