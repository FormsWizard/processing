"use client"

import { store } from 'state';
import { Provider } from 'react-redux';
import { SecurityStateProvider, defaultSecurityState } from 'security-state';
import { defaultSyncState } from 'security-state/features/attackVectors/syncServerWebrtc';
import { SecuredYProvider } from 'secured-react-redux-yjs';
import NoSsr from '@mui/base/NoSsr';
import { ThemeProvider } from '@mui/material/styles'
import { useMemo } from 'react'
import { getTheme } from 'style'

import { Layout } from 'layout';
import { Table } from 'edit-table';
import { Form } from 'edit-form';
import { tabs } from '../app/Tabs';

import { Wip } from 'import';

export interface AppProps {
  title?: string;
}

export const App = ({
  title = 'FormsWizard Processing'
}: AppProps) => {

  const themeMode = 'light' as 'light' | 'dark'  // TODO
  const theme = {} //useMemo(() => getTheme(themeMode), [themeMode])

  const hash = typeof location != 'undefined' && location.hash.slice(1);
  const hashParameters = !hash ? {} : Object.fromEntries(new URLSearchParams(hash));

  const initialSecurityState = {
    ...defaultSecurityState,
    syncServerDataWebrtc: defaultSyncState({password: hashParameters['dataKey']}),
    syncServerSessionWebrtc: defaultSyncState({password: hashParameters['sessionKey']})
  };

  return <NoSsr>
           <ThemeProvider theme={theme}>
             <SecurityStateProvider initialSecurityState={initialSecurityState}>
               <Provider store={store}>
                 <SecuredYProvider store={store}>
                   <Layout title={ title }
                           drawer={ <Form/> }
	                   tabs={ tabs }
                   >
		     <Wip/>
                     <Table/>
                   </Layout>
                 </SecuredYProvider>
               </Provider>
             </SecurityStateProvider>
           </ThemeProvider>
         </NoSsr>;
};
