const path = require('path');
const assert = require('assert');
const {
  Runner,
  isTestFile,
  toCompleteModule,
} = require('../');

const runner = new Runner({ suppressLog: true });

test('Runner should have a bare structure', () => {
  assert.ok(runner instanceof Runner);
});

test('Runner should load the tests properly', () => {
  assert.ok(runner.tests.length > 0);
});

test('Runner should is test file', () => {
  assert.ok(isTestFile.call({ testCase: true }, 'test-spect.js'));
});

test('Runner should to complete module', () => {
  assert.strictEqual(
    toCompleteModule('test-spect.js'),
    `${process.cwd()}/test/test-spect`
  );
});
