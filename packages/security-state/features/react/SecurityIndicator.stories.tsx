import type { Meta, StoryObj } from '@storybook/react';
import { SecurityIndicator } from './SecurityIndicator';
import { SECURITY_LEVEL } from '../model';

const meta = {
  title: 'security-state/SecurityIndicator',
  component: SecurityIndicator,
  argTypes: { fakeLevel: { control: 'select',
	                   options: [SECURITY_LEVEL.advanced, SECURITY_LEVEL.good, SECURITY_LEVEL.dubious, SECURITY_LEVEL.insufficient] }}
} satisfies Meta<typeof SecurityIndicator>;
export default meta;

export const Advanced: StoryObj<typeof meta> = {
  args: { fakeLevel: SECURITY_LEVEL.advanced }
};

export const Good: StoryObj<typeof meta> = {
  args: { fakeLevel: SECURITY_LEVEL.good }
};

export const Dubious: StoryObj<typeof meta> = {
  args: { fakeLevel: SECURITY_LEVEL.dubious }
};

export const Insufficient: StoryObj<typeof meta> = {
  args: { fakeLevel: SECURITY_LEVEL.insufficient }
};
