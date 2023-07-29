import { Popper } from 'style';
import { SecurityIndicator } from './SecurityIndicator';
import { PresetSelector } from './PresetSelector';

export function SecurityIndicatorMenu() {
  return <Popper id='securityIndicatorMenu'
                 Button={SecurityIndicator as any}
		 Content={<PresetSelector/>} />
}
