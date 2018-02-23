'use strict';

const assert = require('assert');
const promisify = require('util').promisify;
const readFileAsync = promisify(require('fs').readFile);

module.exports = class Config {
  static async load(filePath) {
    const conf = JSON.parse(await readFileAsync(filePath, 'utf-8'));
    return new Config(conf);
  }

  /**
   * The configuration object to validate and wrap.
   * @param {object} cfg
   * @property {string} org The organization (or username) for the repository.
   * @property {string} repo The repository name
   * @property {string=} remote The remote server to use (if not specified
   * defaults to https://github.com).
   */
  constructor(cfg) {
    assert(cfg, 'Config was empty!');
    assert(cfg.org, 'Config must have an "org" property!');
    assert(cfg.repo, 'Config must have a "repo" property!');
    Object.assign(this, cfg);
    // Default to GitHub, but allow custom remotes.
    this.remote = this.remote || 'https://github.com';
  }
};
