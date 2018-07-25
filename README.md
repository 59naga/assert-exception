Assert-exception
---
<p align="right">
  <a href="https://www.npmjs.com/package/assert-exception">
    <img alt="Npm version" src="https://badge.fury.io/js/assert-exception.svg">
  </a>
  <a href="https://travis-ci.org/59naga/assert-exception">
    <img alt="Build Status" src="https://travis-ci.org/59naga/assert-exception.svg?branch=master">
  </a>
</p>

Installation
---
```bash
$ yarn add -D assert-exception
# or
$ npm install assert-exception --save-dev
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

return the `rejected` reason unless `fulfill`.

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
* NodeJS v10.6.0
* Yarn v1.8.0

```bash
git clone https://github.com/59naga/assert-exception
cd assert-exception
yarn

yarn test
```

License
---
[MIT](http://59naga.mit-license.org/)
