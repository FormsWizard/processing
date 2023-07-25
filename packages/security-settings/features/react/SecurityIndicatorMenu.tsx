import { useState, MouseEvent } from 'react';
import { Popper, Box } from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import { SecurityIndicator } from './SecurityIndicator';
import { PresetSelector } from './PresetSelector';

export function SecurityIndicatorMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event?.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <SecurityIndicator onClick={handleClick} /*aria-describedby={id}}*/ />
        <Popper id={id} open={open} anchorEl={anchorEl} sx={{ zIndex: 1, paddingRight: '1rem' }}>
          <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
	    <PresetSelector/>
          </Box>
        </Popper>
      </div>
    </ClickAwayListener>
  );
}
