#!/usr/bin/env node
// Test runner
const fs = require('fs');
const path = require('path');
const assert = require('assert');

class Runner {
  constructor(tests = [], opts = { suppressLog: false }) {
    this.tests = tests;
    this.opts = opts;
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

    if (!this.opts.suppressLog) {
      console.log('');
      console.log(`${this.passed} / ${this.total} tests passed.`);
      console.log('');
    }

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
}], { suppressLog: true });
assert.ok(runner instanceof Runner);
assert.deepStrictEqual(runner.getTests(), runner.tests);
assert.deepStrictEqual(runner.getTestCase(0), runner.tests[0]['testCase']);

function isTestFile(f) {
  const testCase = this.testCase || false;
  const testToRun = testCase ? 'test-spect.js' : process.argv[2];
  return testToRun
    ? path.basename(testToRun) === f
    : /^test\-.*?\.js/.test(f);
}
assert.ok(isTestFile.call({ testCase: true }, 'test-spect.js'));

function toRelativeModule(f) {
  return `./${f.replace(/\.js$/, '')}`;
}
assert.equal(toRelativeModule('test-spect.js'), './test-spect');

const requires = fs.readdirSync(process.cwd())
  .filter(isTestFile)
  .map(toRelativeModule);

const spect = new Runner(requires.map(require).map((mod, i) => {
  return {
    name: requires[i],
    testCase: mod,
  };
}));

process.exit(spect.code);
