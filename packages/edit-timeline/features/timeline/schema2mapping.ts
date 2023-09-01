import { JsonSchema, UISchemaElement } from '@jsonforms/core'

export function schema2mapping(json: JsonSchema, uiSchema?: UISchemaElement) {
  // TODO
  const mapping = {
    "content": "Mehrzeiliges Textfeld",
    "start": "Datumsfeld",
    "end": "Datumszeitfeld"
  }

  return mapping
}
