import { useAppSelector, /*useAppDispatch, setRowData*/ } from 'state';
import { selectJsonSchema, selectPubKeys, selectCryptedData } from 'project-state';
import { PGPProvider, decryptUsingContext } from 'pgp-provider';

export function DecryptLastNewSubmission() {
  const jsonSchema = useAppSelector(selectJsonSchema);
  const cryptedData = useAppSelector(selectCryptedData);

  console.log({jsonSchema, cryptedData});
  const { data } = cryptedData[cryptedData.length-1] || {}
  return <p>{ decryptUsingContext(data) }</p>
}

export function Wip() {
  return <PGPProvider>
    <DecryptLastNewSubmission/>
  </PGPProvider>
}
