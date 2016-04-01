// dependencies
import 'babel-polyfill';
import assert from 'power-assert';

// target
import { throws, rejects } from '../src';

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

  it('rejects', async () => {
    assert((await rejects(Promise.reject(new Error('foo')))).message === 'foo');
    assert((await rejects(rejects(Promise.resolve(new Error('foo'))))).message === 'foo');
  });
});
