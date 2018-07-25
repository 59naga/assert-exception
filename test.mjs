import spec from 'eastern';
import assert from 'assert';

import { throws, rejects } from './';

spec('throws', () => {
  assert(throws(() => {}).message === undefined);

  assert(
    throws(() => {
      throw new Error('foo');
    }).message === 'foo'
  );
});

spec('rejects: should reject the case is not a promise', async () => {
  await rejects('not promise').then(
    () => Promise.reject(new Error('Missing expected rejection..')),
    reason => assert(reason.message === 'argument is not a promise')
  );
});

spec('rejects: should return the rejected reason', async () => {
  await rejects(Promise.reject(new Error('foo'))).then(
    reason => assert(reason.message === 'foo'),
    () => Promise.reject(new Error('Missing expected resolve..'))
  );
});

spec('rejects: should be stated that it has been fulfill, and reject', async () => {
  await rejects(Promise.resolve(new Error('foo'))).then(
    () => Promise.reject(new Error('Missing expected rejection..')),
    reason => assert(reason.message === 'Missing expected rejection..')
  );
});
