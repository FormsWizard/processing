import type { Meta, StoryObj } from '@storybook/react';
import { TableWithProvider } from './TableWithProvider';

const meta = {
  title: 'App',
  component: TableWithProvider,
} satisfies Meta<typeof TableWithProvider>;
export default meta;

export const Story: StoryObj<typeof meta> = {};
