import type { Meta, StoryObj } from '@storybook/react';
import { PresetSelector } from './PresetSelector';
import { SecurityStateProvider } from './SecurityStateProvider';
import { SecurityIndicator } from './SecurityIndicator';

export function PresetSelectorDemo() {
  return <SecurityStateProvider>
           <SecurityIndicator/>  {/** To see the impact of changed preset **/}
           <PresetSelector/>
         </SecurityStateProvider>
}

const meta = {
  title: 'security-settings/PresetSelector',
  component: PresetSelectorDemo,
} satisfies Meta<typeof PresetSelector>;
export default meta;

//export const Story: StoryObj<typeof meta> = {};
