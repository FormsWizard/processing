import { PropsWithChildren, ReactElement, useCallback, useState } from 'react';

import ProcessingMenu from '../menu/ProcessingMenu';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { SecurityIndicatorMenu } from 'security-state';
import { ConnectionIndicatorMenu } from 'secured-react-redux-yjs';

export type Tab = {
  label: string,
  icon: ReactElement,
  content: ReactElement
};

export type LayoutProps = {
  title: string,
  drawer: ReactElement,
  drawerWidth?: string,
  tabs: Tab[]
};

export function Layout({children, title, drawer, drawerWidth='30%', tabs}: PropsWithChildren<LayoutProps>) {
  const [tabIdx, setTabIdx] = useState(2);
  const tabContent = tabs[tabIdx].content;

  const login = <>
                  <IconButton
                    aria-label="account of current user"
                    color="inherit"
                    disabled  // While not implemented
                  >
                    <AccountCircle />
                  </IconButton>
		  { /*Logout*/ }
                </>;

  const toolbar = <>
                    <ProcessingMenu/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      { title }
                    </Typography>
		    <ConnectionIndicatorMenu/>
		    <SecurityIndicatorMenu/>
                    { login }
                  </>;

  const toolbarPlaceholder = <Toolbar/>;  // prevent the AppBar from being in front of our content

  return <Box sx={{ /*display: 'flex'*/ }}>
           <AppBar position="fixed">
	     <Toolbar variant="dense">
	       { toolbar }
             </Toolbar>
	   </AppBar>
	   <Box sx={{ display: 'block' }}>
             <Drawer
               variant="permanent"
               sx={{display: { xs: 'none', md: 'block',
                               '& .MuiDrawer-paper': {
                                  boxSizing: 'border-box',
                                  zIndex: 'inherit',
                                  width: drawerWidth,
				  padding: '1em',
                               }
                             },
                  }}
               open
	       anchor={'right'}
             >
               <Box>{ toolbarPlaceholder }{ drawer as any }</Box>
             </Drawer>

             <Box
               sx={{//flexGrow: 1,
                    width: { md: `calc(100% - ${drawerWidth})` },
                    '& .MuiPaper-root': {
		      display: 'grid',
		      width: '100%',
                    }
                   }}
             >
               { toolbarPlaceholder }
	       { children as any }

               <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                 <Tabs value={ tabIdx } /*onChange={handleChange}*/>
                   { tabs.map( (tab, idx) => { const onClick = useCallback( () => setTabIdx(idx), [idx] );
			                       return <Tab key={'tab'+idx} icon={tab.icon as any} label={tab.label} onClick={onClick} /> } ) }
                 </Tabs>
               </Box>
	       { tabContent }
	     </Box>
	   </Box>
         </Box>
}
