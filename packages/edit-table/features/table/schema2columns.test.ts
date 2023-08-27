import { schema2columns } from './schema2columns';

test('single object with single property', () => {
  const schema = {
    "type": "object",
    "properties": {
      "city": {
        "type": "string"
      }
    }
  }
  expect(schema2columns( schema )).toStrictEqual(
    [
      {
        "accessorKey": "city",
        "header": "City",
      }
    ]
  );
});

test('single object + prefix', () => {
  const schema = {
    "type": "object",
    "properties": {
      "firstName": {
        "type": "string"
      },
      "lastName": {
        "type":"string"
      }
    }
  }
  expect(schema2columns( schema, 'name' )).toStrictEqual(
    [
      {
        "accessorKey": "name.firstName",
        "header": "First Name",
      },
      {
        "accessorKey": "name.lastName",
        "header": "Last Name",
      }
    ]
  );
});

test('nested objects', () => {
  const schema = {
    "type": "object",
    "properties": {
      "name": {
        "type": "object",
        "properties": {
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type":"string"
          }
        }
      }
    }
  }
  expect(schema2columns( schema )).toStrictEqual(
    [
      {
        "accessorKey": "name",
        "header": "Name",
        "columns": [
          {
            "accessorKey": "name.firstName",
            "header": "First Name"
          },
          {
            "accessorKey": "name.lastName",
            "header": "Last Name"
          }
        ]
      }
    ]
  );
});

test('format data-time', () => {
  const schema = {
    "type": "object",
    "properties": {
      "birthDate": {
        "type": "string",
	"format": "date-time"
      }
    }
  }
  expect(schema2columns( schema )).toStrictEqual(
    [
      {
        "accessorKey": "birthDate",
        "header": "Birth Date",
	"muiTableBodyCellEditTextFieldProps": {
	  "type": "datetime-local"
	}
      }
    ]
  );
});
