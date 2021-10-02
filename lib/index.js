const assert = require('assert');

class Expect {
  constructor(actual) {
    this.actual = actual;

    this.toStrictEqual = this.toStrictEqual.bind(this);
    this.toNotStrictEqual = this.toNotStrictEqual.bind(this);
    this.toBeTruthy = this.toBeTruthy.bind(this);
    this.toNotBeTruthy = this.toNotBeTruthy.bind(this);
  }

  toStrictEqual(...args) {
    args.unshift(this.actual);
    try {
      return assert.strictEqual.apply(this, args);
    } catch (err) {
      return assert.deepStrictEqual.apply(this, args);
    }
  }

  toNotStrictEqual(...args) {
    args.unshift(this.actual);
    try {
      return assert.notStrictEqual.apply(this, args);
    } catch (err) {
      return assert.notDeepStrictEqual.apply(this, args);
    }
  }

  toBeTruthy(...args) {
    args.unshift(this.actual);
    return assert.ok.apply(this, args);
  }

  toNotBeTruthy(...args) {
    this.actual = !this.actual;
    return this.toBeTruthy.apply(this, args);
  }
}
exports.Expect = Expect;

const expect = (actual) => {
  return new Expect(actual);
}
exports.expect = expect;
