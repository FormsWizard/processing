import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import LockIcon from '@mui/icons-material/Lock';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import IconButton from '@mui/material/IconButton';
import { SECURITY_INDICATOR } from 'style';

export enum SECURITY_LEVELS { advanced='advanced', good='good', dubious='dubious', insufficient='insufficient' };

export function SecurityIndicator({level}: {level: SECURITY_LEVELS}) {
  var icon;
  switch(level) {
    case SECURITY_LEVELS.advanced:
      icon = <EnhancedEncryptionIcon sx={{backgroundColor: SECURITY_INDICATOR.advanced, color: 'white'}}/>;
      break;
    case SECURITY_LEVELS.good:
      icon = <LockIcon sx={{backgroundColor: SECURITY_INDICATOR.good, color: 'white'}}/>;
      break;
    case SECURITY_LEVELS.dubious:
      icon = <ContactSupportIcon sx={{backgroundColor: SECURITY_INDICATOR.dubious, color: 'white'}}/>;
      break;
    //case SECURITY_LEVELS.insufficient:
    default:
      icon = <LockOpenIcon sx={{backgroundColor: SECURITY_INDICATOR.insufficient, color: 'white'}}/>;
  }

  return <IconButton>
           { icon }
         </IconButton>
}
