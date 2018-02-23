'use strict';

const mkTmpDir = require('./utils').mkTmpDir;
const path = require('path');
/**
 *
 * @param {Config} cfg The configuration object that contains the info
 * necessary to clone a repo instance from GitHub.
 */

module.exports = async function getRepo(cfg) {
  const tmpDir = await mkTmpDir();
  const git = require('simple-git')(tmpDir);
  const url = `${cfg.server}/${cfg.org}/${cfg.repo}`;
  await git.clone(url);
  return path.join(tmpDir, cfg.repo);
};
