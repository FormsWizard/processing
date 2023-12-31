import type { Meta, StoryObj } from '@storybook/react';
import { App } from './App';

const meta = {
  title: 'example/App',
  component: App,
} satisfies Meta<typeof App>;
export default meta;

export const Story: StoryObj<typeof meta> = {};
