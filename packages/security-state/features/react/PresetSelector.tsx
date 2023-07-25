import { useCallback } from 'react';
import { attackVectors } from "../attackVectors";
import { useSecurityStateContext, useSecurityStateDispatchContext, ACTIONS } from './SecurityStateProvider';
import { Preset } from '../attackVectors/syncServerWebrtc/presets.model'
import * as _ from 'lodash';
import { Grid, Card, CardActionArea, CardContent, CardMedia, CardHeader, Typography } from '@mui/material';

function PresetSelectorCard({preset, raised, index}: {preset: Preset, raised?: boolean, index: number}) {
  const securityStateDispatch = useSecurityStateDispatchContext();
  const onClick = useCallback( () => securityStateDispatch && securityStateDispatch({ attackVector: 'syncServerWebrtc',
                                                                                      type: ACTIONS.selectPreset,
                                                                                      payload: {index} }),
			       [index, securityStateDispatch] );
  const Icon = preset._ui?.icon;
  return (
    <Card onClick={onClick}
          variant='outlined'
          sx={{ margin: '1em', maxWidth: '500px', backgroundColor: raised ? 'highlight' : '' }}>
      <CardActionArea sx={{height: '100%'}}>
        <CardContent>
          { Icon && <CardMedia component={Icon}
		               sx={{height: '3em', width: 1}} /> }
          <CardHeader title={ preset._ui?.title }
	              subheader={ preset._ui?.subtitle }
		      align='center'/>
          <Typography variant="body2" color="text.secondary">
	    { preset._ui?.body }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const { syncServerWebrtc } = attackVectors;
const { presets } = syncServerWebrtc;

export function PresetSelector() {
  const securityState = useSecurityStateContext();
  const activePreset = securityState?.syncServerWebrtc?.preset;
  return <Grid container={true}>
           { presets?.map( (preset, i) => <PresetSelectorCard key={'preset'+i}
                                                              preset={preset}
                                                              raised={_.isEqual(preset.settings, activePreset?.settings)}
                                                              index={i} /> ) }
         </Grid>
}
