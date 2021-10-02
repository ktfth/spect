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

test('Expect should have a deep equal', () => {
  expect({ a: 1, b: 2, c: 3 }).toStrictEqual({ a: 1, b: 2, c: 3});
});
