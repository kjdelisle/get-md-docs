'use strict';

const _debug = require('debug');

/**
 * The automatically-wrapped debug hook for get-docs.
 * Debugging strings will take the form get-docs:${scope}.
 * (ex. get-docs:foo)
 * @param {string} scope The scope of the debug call
 * @returns {Function} The primed debug hook to call for logging to
 * debug target(s).
 */
module.exports = function debug(scope) {
  return _debug(`get-docs:${scope}`);
};
