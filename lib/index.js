const assert = require('assert');

class Expect {
  constructor(actual) {
    this.actual = actual;

    this.toStrictEqual = this.toStrictEqual.bind(this);
  }

  toStrictEqual(expected, message='') {
    return assert.strictEqual(this.actual, expected, message);
  }
}
exports.Expect = Expect;

const expect = (actual) => {
  return new Expect(actual);
}
exports.expect = expect;
