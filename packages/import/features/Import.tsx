import { useEffect } from 'react';

import { useAppSelector, useAppDispatch, setRowData } from 'state';
import { selectJsonSchema, selectCryptedData, setCryptedData, selectUiSchema, setJsonSchema, setUiSchema, CryptedData } from 'project-state';
import { PGPProvider, decryptUsingContext } from 'pgp-provider';
import { api } from '@formswizard/api';

function useFormId() {
  const hash = typeof location != 'undefined' ? location.hash.slice(1) : '';
  const hashParameters = !hash ? {} : Object.fromEntries(new URLSearchParams(hash) as any);
  const { formId } = hashParameters;
  return formId
}

export function DecryptAndImportLastNewSubmission() {
  const dispatch = useAppDispatch();
  const formId = useFormId();
  const jsonSchema = useAppSelector(selectJsonSchema);

  const cryptedData = useAppSelector(selectCryptedData);
  useEffect( () => {
    async function loadCryptedData() {
      const { cryptedData } = await api.getProjectStateCryptedData(formId);
      const latestCryptedDatum = cryptedData?.length && cryptedData[cryptedData.length-1];
      latestCryptedDatum && dispatch(setCryptedData(latestCryptedDatum));
    }
    console.log({cryptedData})
    cryptedData.length || loadCryptedData()
  }, [cryptedData])

  /** TODO: Delete decrypted dataset after import and loop over submissions **/

  const cryptedDatum = cryptedData[cryptedData.length-1] || {} as CryptedData;
  const { id, data, keyId, armoredPublicKey } = cryptedDatum
  const decrypted_str = decryptUsingContext(data);
  const decrypted = decrypted_str && JSON.parse(decrypted_str);

  useEffect( () => {
    const row = { ...decrypted, id, keyId, armoredPublicKey }
    decrypted && dispatch(setRowData({row}));
  }, [decrypted]);

  return <></>
}

export function useSchema() {
  const dispatch = useAppDispatch();
  const formId = useFormId();
  const jsonSchema = useAppSelector(selectJsonSchema);
  const uiSchema = useAppSelector(selectUiSchema);

  useEffect(() => {
    async function loadSchema() {
      const { schema } = await api.getProjectStateSchema(formId);
      const { jsonSchema, uiSchema } = schema || {};
      jsonSchema && dispatch(setJsonSchema(jsonSchema))
      jsonSchema && dispatch(setUiSchema(uiSchema))
    }
    jsonSchema || loadSchema()
  }, [jsonSchema, uiSchema, dispatch])
}

export function Import() {
  useSchema()

  return <PGPProvider>
    <DecryptAndImportLastNewSubmission/>
  </PGPProvider>
}
