import { JsonSchema } from '@jsonforms/core'

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

function property2column([key, schema]: [key: string, schema: JsonSchema],
			 prefix: string): Column {
  const accessorKey = prefix == '' ? key : prefix + '.' + key;

  const muiTableBodyCellEditTextFieldProps = {
    type: schema.type == "string" && schema.format == "date-time" ? "datetime-local" : undefined
  }

  const common = {
    accessorKey,
    header: upperCaseWord(splitCamelCase(key)),
    ...notOnlyUndefined({muiTableBodyCellEditTextFieldProps})
  }

  switch(schema.type) {
    case "object":
      return {
	...common,
	columns: Object.entries(schema.properties||{})
	         .map(([key, property]) => property2column([key, property], accessorKey))
      }
    default:
      return common
  }
}

export function schema2columns(schema: JsonSchema, prefix='') {
  switch(schema.type) {
    case "object":
      return Object.entries(schema.properties||{})
             .map(KeyAndProperty => property2column(KeyAndProperty, prefix))
    default:
      console.error('Schema is expected to be of type object!', schema)
      return
  }
}
