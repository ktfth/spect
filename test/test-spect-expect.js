const assert = require('assert');
const { Expect, expect } = require('../lib');

test('Expect should have a facade for execution', () => {
  assert.ok(expect('foo') instanceof Expect);
});

test('Expect should have semantic equal comparison', () => {
  expect('foo').toStrictEqual('foo');
});
