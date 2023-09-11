import { useEffect } from 'react';

import { useAppSelector, useAppDispatch, setRowData } from 'state';
import { selectJsonSchema, selectCryptedData, setCryptedData, selectUiSchema, setJsonSchema, setUiSchema } from 'project-state';
import { PGPProvider, decryptUsingContext } from 'pgp-provider';
import { DefaultService, OpenAPI } from '@formswizard/api';

OpenAPI.BASE = 'http://localhost:4000';
const { getProjectStateCryptedData, getProjectStateSchema } = DefaultService;

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
      const { cryptedData } = await getProjectStateCryptedData(formId);
      const latestCryptedDatum = cryptedData?.length && cryptedData[cryptedData.length-1];
      latestCryptedDatum && dispatch(setCryptedData(latestCryptedDatum));
    }
    console.log({cryptedData})
    cryptedData.length || loadCryptedData()
  }, [cryptedData])

  /** TODO: Delete decrypted dataset after import and loop over submissions **/

  const { data, uuid, keyId, armoredPublicKey } = cryptedData[cryptedData.length-1] || {};
  const decrypted_str = decryptUsingContext(data);
  const decrypted = decrypted_str && JSON.parse(decrypted_str);

  useEffect( () => {
    const row = { ...decrypted, id: uuid, uuid, keyId, armoredPublicKey }
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
      const { schema } = await getProjectStateSchema(formId);
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
