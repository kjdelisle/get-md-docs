'use strict';

const debug = require('./debug')('config');
const assert = require('assert');
const path = require('path');
const promisify = require('util').promisify;
const readFileAsync = promisify(require('fs').readFile);

module.exports = class Config {
  static async load(filePath) {
    const fPath = path.resolve(filePath);
    debug(`loading config: ${fPath}`);
    const cfg = await readFileAsync(fPath, 'utf-8');
    const conf = JSON.parse(cfg);
    return new Config(conf);
  }

  /**
   * The configuration object to validate and wrap.
   * @param {object} cfg
   * @property {string} org The organization (or username) for the repository.
   * @property {string} repo The repository name
   * @property {string=} dest The destination path for the documents
   * @property {string=} server The remote server to use (if not specified
   * defaults to https://github.com).
   */
  constructor(cfg) {
    assert(cfg, 'Config was empty!');
    assert(cfg.org, 'Config must have an "org" property!');
    assert(cfg.repo, 'Config must have a "repo" property!');
    Object.assign(this, cfg);
    // Default to GitHub, but allow custom remotes.
    this.server = this.server || 'https://github.com';
    this.dest = this.dest || path.resolve('.', cfg.repo);
  }
};
