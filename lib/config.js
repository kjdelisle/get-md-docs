'use strict';

const assert = require('assert');
const promisify = require('util').promisify;
const readFileAsync = promisify(require('fs').readFile);

module.exports = class Config {
  static async load(filePath) {
    const conf = JSON.parse(await readFileAsync(filePath, 'utf-8'));
    return new Config(conf);
  }

  constructor(cfg) {
    assert(cfg, 'Config was empty!');
    assert(cfg.org, 'Config must have an "org" property!');
    assert(cfg.repo, 'Config must have a "repo" property!');
    Object.assign(this, cfg);
  }
};
