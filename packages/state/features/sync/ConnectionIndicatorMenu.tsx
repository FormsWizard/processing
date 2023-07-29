import { useState, useEffect } from 'react';
import { Popper } from 'style';
import { ConnectionIndicator, OnlineStatus } from './ConnectionIndicator';
import { useYContext } from '../state/YProvider';
import { Grid } from '@mui/material';
import { GridOn, Edit } from '@mui/icons-material';
import { VpnKey, VpnKeyOff } from '@mui/icons-material';
import { Link } from '@mui/icons-material';

export function ConnectionIndicatorMenu({interval=10}: {interval?: number}) {
  const [_lastUpdate, setLastUpdate] = useState(new Date());
  useEffect(() => {
    var timerID = setInterval(() => setLastUpdate(new Date()), 1000*interval);
    return () => clearInterval(timerID);
  }, [interval]);

  const yState = useYContext();
  //console.log(yState);
  const slicesStateByName = Object.fromEntries( (yState.slices||[]).map( s => [s.slice, s] ) );
  const slicesDefs = {data: {title: 'Data',
	                     img: GridOn},
                      editorState: {title: 'Session',
			            img: Edit}};
  const providerDefs = {webrtc: {title: 'WebRTC'}};

  const Content =
    <Grid>
      { Object.entries(slicesDefs).map( ([sliceId, sliceDef]) => {
        const { providers } = slicesStateByName[sliceId];
        return <div key={sliceId}>
	         <h3>
		   <sliceDef.img sx={{verticalAlign: 'bottom'}}/> &nbsp;
		   {sliceDef.title}
		 </h3>
		 { Object.entries(providerDefs).map( ([providerId, providerDef]) => {
		   const provider = providers[providerId];
                   const online = Array.from(provider.provider?.awareness.states||{}).length;
                   return <Grid key={providerId} sx={{paddingLeft: '0.5rem'}}>
                            <h4>
			      {providerDef.title} &nbsp;
                              <Grid sx={{display: 'contents', color: 'text.secondary'}}><OnlineStatus online={online}/></Grid>
			    </h4>
                            <Grid sx={{paddingLeft: '0.5rem'}}>
			      { providerId=='webrtc' && <>
                                  <p><Link sx={{verticalAlign: 'bottom'}}/>Signalling: {provider.options.signaling.join(', ')}</p>
			          {provider.options.password ?
				    <p><VpnKey sx={{verticalAlign: 'bottom'}}/> Passphrase: {provider.options.password}</p> :
                                    <p><VpnKeyOff sx={{verticalAlign: 'bottom'}}/> No Password</p>}
			        </>
			      }
                            </Grid>
                          </Grid>
                 })}
               </div>
      })}
    </Grid>;

  return <Popper id='conectionIndicatorMenu'
                 Button={ConnectionIndicator as any}
		 Content={Content as any} />
}
