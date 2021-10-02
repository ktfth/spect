[![Build Status](https://app.travis-ci.com/ktfth/spect.svg?branch=main)](https://app.travis-ci.com/ktfth/spect)

# Spect Runner

## Description

A tiny test runner

## Usage

```
[sudo] npm i -g spect-runner
```

After the installation put a test on your file placed anywhere:

```js
const assert = require('assert');

test('Describe your test here', () => {
  assert.strictEqual(2 + 2, 4);
});
```

or you can use expect:

```js
test('Describe your test here', () => {
  expect(2 + 2).toStrictEqual(4);
});
```

And run the tool:

```
spect-runner ./test/your-test-file.js
```

See a test file from the repository for more tests example.

## Inspiration

The test runner is inspired by tests of https://github.com/paulirish/source-map-js/blob/cdt/test/run-tests.js.
