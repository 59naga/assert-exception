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
  return new Promise((resolve, reject) => promise.then(reject, resolve));
}
