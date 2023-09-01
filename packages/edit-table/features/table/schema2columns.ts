import { JsonSchema, UISchemaElement } from '@jsonforms/core'

function upperCaseWord(s: string) {
  return s.slice(0,1).toUpperCase() + s.slice(1)
}

function splitCamelCase(s: string) {
  return s.replace(/([^A-Z])([A-Z])/g, '$1 $2')
}

function notOnlyUndefined(o: Object) {
  const key = Object.keys(o)[0] as string;
  const subObject = (o as any)[key];
  return Object.values(subObject).filter(v => v !== undefined).length ? o : {}
}

type Column = {
  accessorKey: string,
  header: string,
  columns?: Column[]
}

function property2column({key, subJsonSchema, prefix, uiSchema}: {key: string, subJsonSchema: JsonSchema, prefix: string, uiSchema?: UISchemaElement}): Column {
  const accessorKey = prefix == '' ? key : prefix + '.' + key;

  const muiTableBodyCellEditTextFieldProps = {
    type: subJsonSchema.type == "string" && subJsonSchema.format == "date-time" ? "datetime-local" : undefined
  }

  const common = {
    accessorKey,
    header: upperCaseWord(splitCamelCase(key)),
    ...notOnlyUndefined({muiTableBodyCellEditTextFieldProps})
  }

  switch(subJsonSchema.type) {
    case "object":
      return {
	...common,
	columns: Object.entries(subJsonSchema.properties||{})
	         .map(([key, property]) => property2column({key, subJsonSchema: property, prefix: accessorKey, uiSchema}))
      }
    default:
      return common
  }
}

export function schema2columns(schema: JsonSchema, uiSchema?: UISchemaElement, prefix='') {
  console.log({schema, uiSchema})
  switch(schema.type) {
    case "object":
      return Object.entries(schema.properties||{})
             .map(([key, subJsonSchema]) => property2column({key, subJsonSchema, prefix, uiSchema}))
    default:
      console.error('Schema is expected to be of type object!', schema)
      return
  }
}
