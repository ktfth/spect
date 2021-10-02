const assert = require('assert');

class Expect {
  constructor(actual) {
    this.actual = actual;

    this.toStrictEqual = this.toStrictEqual.bind(this);
    this.toNotStrictEqual = this.toNotStrictEqual.bind(this);
    this.toBeTruthy = this.toBeTruthy.bind(this);
    this.toNotBeTruthy = this.toNotBeTruthy.bind(this);
    this.toBeThrow = this.toBeThrow.bind(this);
    this.toNotBeThrow = this.toNotBeThrow.bind(this);
    this.toMatch = this.toMatch.bind(this);
    this.toNotMatch = this.toNotMatch.bind(this);
    this.toRejects = this.toRejects.bind(this);
    this.toNotRejects = this.toNotRejects.bind(this);
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

  toBeThrow(...args) {
    args.unshift(this.actual);
    return assert.throws.apply(this, args);
  }

  toNotBeThrow(...args) {
    args.unshift(this.actual);
    return assert.doesNotThrow.apply(this, args);
  }

  toMatch(...args) {
    args.unshift(this.actual);
    return assert.match.apply(this, args);
  }

  toNotMatch(...args) {
    args.unshift(this.actual);
    return assert.doesNotMatch.apply(this, args);
  }

  async toRejects(...args) {
    args.unshift(this.actual);
    return await assert.rejects.apply(this, args);
  }

  async toNotRejects(...args) {
    args.unshift(this.actual);
    return await assert.doesNotReject.apply(this, args);
  }
}
exports.Expect = Expect;

const expect = (actual) => {
  return new Expect(actual);
}
exports.expect = expect;
