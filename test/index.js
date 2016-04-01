// dependencies
import 'babel-polyfill';
import assert from 'power-assert';

// target
import { throws, rejected } from '../src';

// specs
describe('asssert-exception', () => {
  it('throws', () => {
    assert(throws(
      () => {},
    ).message === undefined);

    assert(throws(
      () => {throw new Error('foo');},
    ).message === 'foo');
  });

  it('rejected', async () => {
    assert((await rejected(Promise.reject(new Error('foo')))).message === 'foo');
    assert((await rejected(rejected(Promise.resolve(new Error('foo'))))).message === 'foo');
  });
});
