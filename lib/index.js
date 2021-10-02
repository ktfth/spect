const assert = require('assert');

class Expect {
  constructor(actual) {
    this.actual = actual;

    this.toStrictEqual = this.toStrictEqual.bind(this);
    this.toBeTruthy = this.toBeTruthy.bind(this);
  }

  toStrictEqual(...args) {
    args.unshift(this.actual);
    try {
      return assert.strictEqual.apply(this, args);
    } catch (err) {
      return assert.deepStrictEqual.apply(this, args);
    }
  }

  toBeTruthy(...args) {
    args.unshift(this.actual);
    return assert.ok.apply(this, args);
  }
}
exports.Expect = Expect;

const expect = (actual) => {
  return new Expect(actual);
}
exports.expect = expect;
