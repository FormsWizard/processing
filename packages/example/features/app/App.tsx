"use client"

import { store } from 'state';
import { Provider } from 'react-redux';
import { YProvider, TestConsumer } from 'state';
import { SecurityStateProvider } from 'security-settings';

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


  return <SecurityStateProvider>
           <Provider store={store}>
             <YProvider initialYState={{room: 'exampleRoom',
                                        webrtcConfig: {signaling: ['ws://localhost:4444']}}}>
               <Layout title={ title }
	               drawer={ <Form/> }
	               tabs={ tabs }
               >
                 <Table/>
               </Layout>
	       <TestConsumer/>
             </YProvider>
           </Provider>
	 </SecurityStateProvider>;
};
