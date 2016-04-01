Assert Exception
---

<p align="right">
  <a href="https://npmjs.org/package/assert-exception">
    <img src="https://img.shields.io/npm/v/assert-exception.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/59naga/assert-exception">
    <img src="http://img.shields.io/travis/59naga/assert-exception.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/assert-exception/coverage">
    <img src="https://img.shields.io/codeclimate/github/59naga/assert-exception.svg?style=flat-square">
  </a>
  <a href="https://codeclimate.com/github/59naga/assert-exception">
    <img src="https://img.shields.io/codeclimate/coverage/github/59naga/assert-exception.svg?style=flat-square">
  </a>
  <a href="https://gemnasium.com/59naga/assert-exception">
    <img src="https://img.shields.io/gemnasium/59naga/assert-exception.svg?style=flat-square">
  </a>
</p>

Installation
---
```bash
npm install assert-exception --save-dev
```

Usage
---
without `assert-exception`
```js
import assert from 'power-assert';

assert.throws(
  () => {
    throw new Error('foo');
  },
  (error) => {
    assert(error.message === 'foo');
    return true; // requirement :(
  }
); // pass
```

with `assert-exception`
```js
import assert from 'power-assert';
import { throws } from 'assert-exception';

assert(throws(
  () => {throw new Error('foo');},
).message === 'foo'); // pass
```

if doesn't become the exception, it returns an empty object.
```js
import assert from 'power-assert';
import { throws } from 'assert-exception';

assert(throws(
  () => {},
).message === 'foo'); // fail
//
// AssertionError:   # foo.js:4
//
//   assert(throws(() => {}).message === 'foo')
//          |                |       |
//          |                |       false
//          Object{}         undefined
//
```

API
---

# `throws(exception)` -> `Error` or `{}`

run the `exception`, and returns the `error`. if not returned `error`, it returns an empty object.

```js
import assert from 'power-assert';
import { throws } from 'assert-exception';

assert(throws(
  () => {},
).message === undefined); // pass

assert(throws(
  () => {throw new Error('foo');}
).message === undefined); // fail
```

# `rejects(promise)` -> `Promise(reason)`

it reverses the `fulfill` and `rejected`.

```js
import 'babel-polyfill';
import assert from 'power-assert';
import { rejects } from 'assert-exception';

it('rejects', async () => {
  assert((await rejects(Promise.reject(new Error('foo')))).message === 'foo'); // pass
  assert((await rejects(Promise.resolve(new Error('foo')))).message === 'foo'); // fail
});
```

Development
---
Requirement global
* NodeJS v5.7.0
* Npm v3.7.1

```bash
git clone https://github.com/59naga/assert-exception
cd assert-exception
npm install

npm test
```

License
---
[MIT](http://59naga.mit-license.org/)
