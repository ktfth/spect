const { Runner } = require('../');
const assert = require('assert');

test('Runner should have a bare structure', () => {
  const runner = new Runner([{
    name: 'sample #1',
    testCase: {
      'test sample #1': (a) => {
        const actual = 'sample #1';
        const expected = 'test case #1';
        a.ok(actual !== expected);
      }
    }
  }], { suppressLog: true });
  assert.ok(runner instanceof Runner);
  assert.deepStrictEqual(runner.getTests(), runner.tests);
  assert.deepStrictEqual(runner.getTestCase(0), runner.tests[0]['testCase']);
});
