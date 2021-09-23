#!/usr/bin/env node
// Test runner
const fs = require('fs');
const path = require('path');
const assert = require('assert');

global.total = 0;
global.passed = 0;

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
    const self = this;

    let requires = fs.readdirSync(path.resolve(process.cwd(), 'test'));

    requires = requires
      .filter(isTestFile)
      .map(toCompleteModule);

    global.test = (name, fn) => {
      const done = () => {};
      const testCaseName = requires[global.total];
      global.total += 1;
      try {
        fn(done);
        global.passed += 1;
      } catch (e) {
        console.log(`[FAILED] ${testCaseName}: ${name}!`);
        console.log(e.stack);
      }
    };

    const tests = requires.map(require).map((mod, i) => {
      return {
        name: requires[i],
        testCase: mod,
      };
    });

    self.tests = tests;
    self.total = global.total;
    self.passed = global.passed;

    if (!self.opts.suppressLog) {
      console.log('');
      console.log(`${self.passed} / ${self.total} tests passed.`);
      console.log('');
    }

    return self.total - self.passed;
  }

  getTests() {
    return this.tests;
  }

  getTestCase(i) {
    return this.getTests()[i]['testCase'];
  }
}
exports.Runner = Runner;

function isTestFile(f, d) {
  const testCase = this.testCase || false;
  const testToRun = testCase ? 'test-spect.js' : process.argv[2];
  return testToRun
    ? path.basename(testToRun) === f
    : /test\-.*?\.js/.test(f);
}
assert.ok(isTestFile.call({ testCase: true }, 'test-spect.js'));

function toCompleteModule(f) {
  return `${process.cwd()}/test/${f.replace(/\.js$/, '')}`;
}
assert.equal(toCompleteModule('test-spect.js'), `${process.cwd()}/test/test-spect`);

if (!module.parent) {
  const spect = new Runner();
  process.exit(spect.code);
}
