"use client"

import { store } from 'state';
import { Provider } from 'react-redux';
import { YProvider } from 'state';
import { SecurityStateProvider } from 'security-state';

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

  const hashParameters = Object.fromEntries(new URLSearchParams(location.hash.slice(1)));

  return <SecurityStateProvider>
           <Provider store={store}>
             <YProvider initialYState={{slices: [{store, slice: 'data', //logging: true,
                                                  providers: {webrtc: {options: {signaling: ['ws://localhost:4444'], password: hashParameters['dataKey']}}}},
                                                 {store, slice: 'editorState',
                                                  providers: {webrtc: {options: {signaling: ['ws://localhost:4444'], password: hashParameters['editorStateKey']}}}}]
	     }}>
               <Layout title={ title }
	               drawer={ <Form/> }
	               tabs={ tabs }
               >
                 <Table/>
               </Layout>
             </YProvider>
           </Provider>
	 </SecurityStateProvider>;
};
