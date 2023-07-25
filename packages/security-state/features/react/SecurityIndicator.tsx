import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import LockIcon from '@mui/icons-material/Lock';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import IconButton from '@mui/material/IconButton';
import { SECURITY_INDICATOR } from 'style';
import { SECURITY_LEVEL } from '../model';
import { useSecurityStateContext } from './SecurityStateProvider';

type OnClick = (event: React.MouseEvent<HTMLElement>) => void

export function SecurityIndicator({fakeLevel, onClick}: {fakeLevel?: SECURITY_LEVEL, onClick?: OnClick}) {
  const { assessment } = useSecurityStateContext()?.syncServerWebrtc || {};
  const level = fakeLevel || assessment;  // TODO
  var icon;
  switch(level) {
    case SECURITY_LEVEL.advanced:
      icon = <EnhancedEncryptionIcon sx={{backgroundColor: SECURITY_INDICATOR.advanced, color: 'white'}}/>;
      break;
    case SECURITY_LEVEL.good:
      icon = <LockIcon sx={{backgroundColor: SECURITY_INDICATOR.good, color: 'white'}}/>;
      break;
    case SECURITY_LEVEL.dubious:
      icon = <ContactSupportIcon sx={{backgroundColor: SECURITY_INDICATOR.dubious, color: 'white'}}/>;
      break;
    //case SECURITY_LEVEL.insufficient:
    default:
      icon = <LockOpenIcon sx={{backgroundColor: SECURITY_INDICATOR.insufficient, color: 'white'}}/>;
  }

  return <IconButton onClick={onClick}>
           { icon }
         </IconButton>
}
