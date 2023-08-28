import { useEffect } from 'react';

import { useAppSelector, useAppDispatch, setRowData } from 'state';
import { selectJsonSchema, selectCryptedData } from 'project-state';
import { PGPProvider, decryptUsingContext } from 'pgp-provider';

export function DecryptAndImportLastNewSubmission() {
  const jsonSchema = useAppSelector(selectJsonSchema);
  const cryptedData = useAppSelector(selectCryptedData);

  /** TODO: Delete decrypted dataset after import and loop over submissions **/

  const { data, uuid, keyId, armoredPublicKey } = cryptedData[cryptedData.length-1] || {};
  const decrypted_str = decryptUsingContext(data);
  const decrypted = decrypted_str && JSON.parse(decrypted_str);

  const dispatch = useAppDispatch();
  useEffect( () => {
    const row = { ...decrypted, id: uuid, uuid, keyId, armoredPublicKey }
    decrypted && dispatch(setRowData({row}));
  }, [decrypted]);

  return <></>
}

export function Import() {
  return <PGPProvider>
    <DecryptAndImportLastNewSubmission/>
  </PGPProvider>
}
