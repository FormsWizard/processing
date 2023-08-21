import { useState, MouseEvent, ReactElement } from 'react';
import * as mui from '@mui/material';
import { ClickAwayListener } from '@mui/base';

export function Popper({Button, Content, id}: {Button: typeof mui.IconButton, Content: ReactElement, id: string}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event?.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <Button onClick={handleClick} aria-describedby={id} />
        <mui.Popper id={id} open={open} anchorEl={anchorEl} sx={{ zIndex: 1, paddingRight: '1rem' }}>
          <mui.Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
	    { Content as any }
          </mui.Box>
        </mui.Popper>
      </div>
    </ClickAwayListener>
  );
}
