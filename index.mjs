/**
 * @param {function} exception - specify a function should throw an exception
 * @returns {undefined|Error} error - the thrown exception
 */
export function throws(exception) {
  let error = {};
  try {
    exception();
  } catch (e) {
    error = e;
  }
  return error;
}

/**
 * @param {promise} promise - a expected reject
 * @returns {promise<reason>} reason - the rejected reason (rejects the fulfill)
 */
export function rejects(promise) {
  if (typeof promise !== 'object' || typeof promise.then !== 'function') {
    return Promise.reject(new TypeError('argument is not a promise'));
  }

  return promise.then(
    () => Promise.reject(new Error('Missing expected rejection..')),
    reason => Promise.resolve(reason)
  );
}
