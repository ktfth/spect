#!/usr/bin/env node
// Test runner
const assert = require('assert');

class Runner {
  constructor(tests = []) {
    this.tests = tests;
    this.total = 0;
    this.passed = 0;

    this.getTests = this.getTests.bind(this);
    this.getTestCase = this.getTestCase.bind(this);
    this.init = this.init.bind(this);

    this.code = this.init();
  }

  init() {
    for (let i = 0; i < this.getTests().length; i += 1) {
      for (let k in this.getTestCase(i)) {
        if (/^test/.test(k)) {
          this.total += 1;
          try {
            this.getTestCase(i)[k](assert);
            this.passed += 1;
          } catch (e) {
            console.log(`[FAILED] ${this.getTests()[i]['name']}: ${k}!`);
            console.log(e.stack);
          }
        }
      }
    }

    console.log('');
    console.log(`${this.passed} / ${this.total} tests passed.`);
    console.log('');

    return this.total - this.passed
  }

  getTests() {
    return this.tests;
  }

  getTestCase(i) {
    return this.getTests()[i]['testCase'];
  }
}
const runner = new Runner([{
  name: 'sample #1',
  testCase: {
    'test sample #1': (a) => {
      const actual = 'sample #1';
      const expected = 'test case #1';
      a.ok(actual !== expected);
    }
  }
}]);
assert.ok(runner instanceof Runner);
assert.deepStrictEqual(runner.getTests(), runner.tests);
assert.deepStrictEqual(runner.getTestCase(0), runner.tests[0]['testCase']);
