import { useState, ReactElement } from 'react';
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export type Item = {
  text?: string,
  icon?: ReactElement,
  disabled?: boolean
}

export function MenuItem({text, icon, disabled=false}: Item) {
  if(!text || text=='-')
    return <Divider/>;
  else
    return (
      <MuiMenuItem disabled={ disabled }>
        <ListItemIcon>{ icon as any }</ListItemIcon>
        <ListItemText>{ text }</ListItemText>
      </MuiMenuItem>
    );
}

export function Menu({items}: {items: Item[]}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="menu"
        edge="start"
	color="inherit"
	aria-label="menu"
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
	sx={{ mr: 2 }}
      >
        <MenuIcon/>
      </IconButton>

      <MuiMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'menu',
        }}
      >
        { items.map((item, idx) => <MenuItem key={'menuItem'+idx} text={item.text} icon={item.icon} disabled={item.disabled}/>) }
      </MuiMenu>
    </>
  );
}
