'use strict';

const _ = require('lodash');
const tap = require('tap');
const getRepo = require('../lib/get-repo');
const fs = require('fs-extra');
const promisify = require('util').promisify;
const readdirAsync = promisify(fs.readdir);
const Config = require('../lib/config');

tap.test('get-repo', async t => {
  const repoPath = await getRepo(
    new Config({
      org: 'steveukx',
      repo: 'git-js'
    })
  );
  const repoFiles = await readdirAsync(repoPath);
  t.ok(Array.isArray(repoFiles), 'array of files returned');
  t.ok(_.includes(repoFiles, 'readme.md'), 'README was included');
  t.end();
});
