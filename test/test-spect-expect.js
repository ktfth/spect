const assert = require('assert');
const { Expect, expect } = require('../lib');

test('Expect should have a facade for execution', () => {
  assert.ok(expect('foo') instanceof Expect);
});

test('Expect should have semantic strict equal comparison', () => {
  expect('foo').toStrictEqual('foo');
});

test('Expect should have a to be truthy', () => {
  expect(true).toBeTruthy();
});

test('Expect should have a deep strict equal', () => {
  expect({ a: 1, b: 2, c: 3 }).toStrictEqual({ a: 1, b: 2, c: 3});
});

test('Expected should have a not semantic strict equal comparison', () => {
  expect('foo').toNotStrictEqual('bar');
});

test('Expect should have a not deep strict equal', () => {
  expect({ a: 1, b: 2, c: 3 }).toNotStrictEqual({ c: 1, f: 2 });
});

test('Expect should have a to not be truthy', () => {
  expect(false).toNotBeTruthy();
});

test('Expect should have to be throw', () => {
  expect(() => {
    throw new Error('Expect throw')
  }).toBeThrow();
});

test('Expect should have to not be throw', () => {
  expect(() => {
    expect(() => {
      throw new TypeError('Wrong value')
    }).toNotBeThrow(SyntaxError);
  }).toBeThrow();
});

test('Expect should have to match', () => {
  expect('foo').toMatch(/[a-z]+/);
});

test('Expect should have to not match', () => {
  expect('bar').toNotMatch(/[0-9]+/);
});

test('Expect should have to rejects', () => {
  expect(async () => {
    throw new TypeError('Wrong value for rejects');
  }).toRejects({
    name: 'TypeError',
    message: 'Wrong value for rejects'
  });
});

test('Expect should have to not rejects', () => {
  expect(async () => {
    throw new TypeError('Wrong value for not rejects');
  }).toNotRejects(SyntaxError);
});
