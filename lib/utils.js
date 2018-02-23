'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const promisify = require('util').promisify;
const mkdirAsync = promisify(fs.mkdir);

/**
 * Make a random temporary directory for whatever you'd like.
 * @returns {Promise<string>} The directory path to the created temp directory.
 */
exports.mkTmpDir = async function mkTmpDir() {
  const tmpDir = path.join(os.tmpdir(), crypto.randomBytes(32).toString('hex'));
  await mkdirAsync(tmpDir);
  return tmpDir;
};
