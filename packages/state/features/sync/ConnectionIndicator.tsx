import { useEffect, useState } from 'react';
import { useYContext } from '../state/YProvider';

import { CONNECTION } from 'style';
import { IconButton } from '@mui/material';

import SignalWifi0BarIcon from '@mui/icons-material/SignalWifi0Bar';
import SignalWifi1BarIcon from '@mui/icons-material/SignalWifi1Bar';
//import SignalWifi2BarIcon from '@mui/icons-material/SignalWifi2Bar';
//import SignalWifi3BarIcon from '@mui/icons-material/SignalWifi3Bar';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';
/** TODO show if connection is well encrypeted **/
import SignalWifiOffIcon from '@mui/icons-material/SignalWifiOff';
//import SignalWifi1BarLockIcon from '@mui/icons-material/SignalWifi1BarLock';
//import SignalWifi2BarLockIcon from '@mui/icons-material/SignalWifi2BarLock';
//import SignalWifi3BarLockIcon from '@mui/icons-material/SignalWifi3BarLock';
//import SignalWifi4BarLockIcon from '@mui/icons-material/SignalWifi4BarLock';
//import WarningIcon from '@mui/icons-material/Warning';

export function OnlineStatus({online}: {online: number}) {
  // TODO: Show state depending on latency (or time since last received message)
  // TODO: Show when deliberately in offline mode
  //return <>Offline Mode &nbsp; <SignalWifiOffIcon sx={{color: CONNECTION.offlineMode}}/></>;
  switch( online ) {
    case 0:
      return <>Offline &nbsp;<SignalWifi0BarIcon sx={{color: CONNECTION.disconnected, verticalAlign: 'bottom'}}/></>;
    case 1:
      return <>{ online } Online &nbsp;<SignalWifi1BarIcon sx={{color: CONNECTION.isolated, verticalAlign: 'bottom'}}/></>;
    default:
      return <>{ online } Online &nbsp;<SignalWifi4BarIcon sx={{color: CONNECTION.perfect, verticalAlign: 'bottom'}}/></>;
  };
};

type Seconds = number;
type OnClick = (event: React.MouseEvent<HTMLElement>) => void

export function ConnectionIndicator({interval=3, fakeOnline, onClick}: {interval?: Seconds, fakeOnline?: number, onClick?: OnClick}) {
  const [_lastUpdate, setLastUpdate] = useState(new Date());
  useEffect(() => {
    var timerID = setInterval(() => setLastUpdate(new Date()), 1000*interval);
    return () => clearInterval(timerID);
  }, [interval]);

  const yState = useYContext();
  const realOnlinePerSlice = (yState.slices||[]).map( sliceState => Object.values(sliceState.providers).map( provider => Array.from(provider.provider?.awareness.states||[]).length )
                                                                                                       .reduce((i, acc) => i+acc, 0) )
  const realOnline = Math.max.apply(Math, [0, ...realOnlinePerSlice])
  const online = fakeOnline || realOnline;

  return <IconButton onClick={onClick} sx={{color: 'white', fontSize: 'larger'}}>
           <OnlineStatus online={online}/>
         </IconButton>
}
