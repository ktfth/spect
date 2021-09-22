#!/usr/bin/env node
// Test runner
const assert = require('assert');

class Runner {
  constructor(tests = []) {
    this.tests = tests;

    this.getTests = this.getTests.bind(this);
    this.getTestCase = this.getTestCase.bind(this);
    this.getIt = this.getIt.bind(this);
  }

  getTests() {
    return this.tests;
  }

  getTestCase(i) {
    return this.getTests()[i]['testCase'];
  }

  getIt(i, j, name) {
    return this.getTestCase(i)[j][name];
  }
}
const runner = new Runner();
assert.ok(runner instanceof Runner);
runner.tests = [{
  name: 'sample #1',
  testCase: [{
    'sample #1': (a) => {
      const actual = 'sample #1';
      const expected = 'test case #1';
      a.ok(actual !== expected);
    }
  }]
}];
assert.deepStrictEqual(runner.getTests(), runner.tests);
assert.deepStrictEqual(runner.getTestCase(0), runner.tests[0]['testCase']);
assert.deepStrictEqual(runner.getIt(0, 0, 'sample #1'), runner.tests[0]['testCase'][0]['sample #1'])
