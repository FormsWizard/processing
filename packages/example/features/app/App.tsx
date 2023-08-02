"use client"

import { store } from 'state';
import { Provider } from 'react-redux';
import { SecurityStateProvider } from 'security-state';
import { SecureYProvider } from 'secured-react-redux-yjs';
import NoSsr from '@mui/base/NoSsr';

import { Layout } from 'layout';
import { Table } from 'edit-table';
import { Form } from 'edit-form';
import { tabs } from '../app/Tabs';

export interface AppProps {
  title?: string;
}

export const App = ({
  title = 'FormsWizard Processing'
}: AppProps) => {

  const hash = typeof location != 'undefined' && location.hash.slice(1);
  const hashParameters = !hash ? {} : Object.fromEntries(new URLSearchParams(hash));

  return <NoSsr>
           <SecurityStateProvider>
             <Provider store={store}>
               <SecureYProvider initialYState={{slices: [{store, slice: 'data', //logging: true,
                                                          providers: {webrtc: {options: {signaling: ['ws://localhost:4444'], password: hashParameters['dataKey']}}}},
                                                         {store, slice: 'editorState',
                                                          providers: {webrtc: {options: {signaling: ['ws://localhost:4444'], password: hashParameters['sessionKey']}}}}]
	       }}>
                 <Layout title={ title }
	                 drawer={ <Form/> }
	                 tabs={ tabs }
                 >
                   <Table/>
                 </Layout>
               </SecureYProvider>
             </Provider>
           </SecurityStateProvider>
         </NoSsr>;
};
