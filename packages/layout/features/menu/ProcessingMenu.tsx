import { Menu, Item } from './Menu';

import EditNoteIcon from '@mui/icons-material/EditNote';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PeopleIcon from '@mui/icons-material/People';
import GridOnIcon from '@mui/icons-material/GridOn';
//import ShareIcon from '@mui/icons-material/Share';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
//import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HelpIcon from '@mui/icons-material/Help';

const items: Item[] = [
  {text: "Edit Form", icon: <EditNoteIcon fontSize="small"/>, disabled: true},
  {text: "Configure Project Security", icon: <VpnKeyIcon fontSize="small"/>, disabled: true},
  {text: "Share Form", icon: <PeopleIcon fontSize="small"/>, disabled: true},
  {text: "Share Dataset", icon: <GridOnIcon fontSize="small"/>, disabled: true},
  {},
  {text: "Import Dataset", icon: <FileOpenIcon fontSize="small"/>, disabled: true},
  {text: "Download Dataset", icon: <FileDownloadIcon fontSize="small"/>, disabled: true},
  {},
  {text: "Personal Preferences", icon: <ManageAccountsIcon fontSize="small"/>, disabled: true},
  {text: "Help", icon: <HelpIcon fontSize="small"/>, disabled: false},
];

export default function ProcessingMenu() {
  return <Menu items={items}/>;
}
