import { ReactNode, useState } from 'react';
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MuiMenu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';

function MenuItem({text, icon, disabled=false}: {text?: string, icon?: ReactNode, disabled?: boolean}) {
  if(!text || text=='-')
    return <Divider/>;
  else
    return (
      <MuiMenuItem disabled={ disabled }>
        <ListItemIcon>{ icon }</ListItemIcon>
        <ListItemText>{ text }</ListItemText>
      </MuiMenuItem>
    );
}

export default function Menu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [{text: "Import Dataset", icon: <FileOpenIcon fontSize="small"/>, disabled: true},
                     {text: "Download Dataset", icon: <FileDownloadIcon fontSize="small"/>, disabled: true},
                     {text: "Share Dataset", icon: <ShareIcon fontSize="small"/>, disabled: true},
                     {},
                     {text: "Settings", icon: <SettingsIcon fontSize="small"/>, disabled: true},
                     {},
                     {text: "Help", icon: <HelpIcon fontSize="small"/>, disabled: false},
                     ];

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
        { menuItems.map((item, idx) => <MenuItem key={'menuItem'+idx} text={item.text} icon={item.icon} disabled={item.disabled}/>) }
      </MuiMenu>
    </>
  );
}
