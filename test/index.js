// dependencies
import 'babel-polyfill';
import Promise from 'bluebird';
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

  describe('rejects', () => {
    it('should reject the case is not a promise', async () => {
      await rejects('not promise')
      .then(
        () => Promise.reject(new Error('Missing expected rejection..')),
        (reason) => assert(reason.message === 'argument is not a promise'),
      );
    });

    it('should return the rejected reason', async () => {
      await rejects(Promise.reject(new Error('foo')))
      .then(
        (reason) => assert(reason.message === 'foo'),
        () => Promise.reject(new Error('Missing expected resolve..')),
      );
    });

    it('should be stated that it has been fulfill, and reject', async () => {
      await rejects(Promise.resolve(new Error('foo')))
      .then(
        () => Promise.reject(new Error('Missing expected rejection..')),
        (reason) => assert(reason.message === 'Missing expected rejection..'),
      );
    });
  });
});
