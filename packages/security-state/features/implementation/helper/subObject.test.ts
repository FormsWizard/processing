import { isSubobject } from './subObject';

test('identical', () => {
  expect( isSubobject({a: 1, b: 2}, {a: 1, b: 2})).toBeTruthy();
});

test('subObject', () => {
  expect( isSubobject({a: 1, b: 2}, {a: 1})).toBeTruthy();
  expect( isSubobject({a: 1, b: 2}, {b: 2})).toBeTruthy();
  expect( isSubobject({a: 1, b: 2}, {})).toBeTruthy();
});

test('different value', () => {
  expect( isSubobject({a: 1, b: 2}, {a: 1, b: 23})).toBeFalsy();
});

test('additional key', () => {
  expect( isSubobject({a: 1, b: 2}, {a: 1, c: 3})).toBeFalsy();
});
