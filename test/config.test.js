'use strict';

const tap = require('tap');
const path = require('path');
const Config = require('../lib/config');

tap.test('config', t => {
  t.test('load', t => {
    t.test('opens a valid config', async t => {
      const testPath = path.resolve(__dirname, 'fixtures', 'valid.json');
      const config = await Config.load(testPath);

      t.ok(config, 'config exists');
      t.equal(config.org, 'myorg', 'config contains org');
      t.equal(config.repo, 'myrepo', 'config contains repo');
      t.ok(config.packages, 'config contains packages object');
      t.ok(
        config.packages.samoflange,
        'packages object contains the samoflange'
      );
      t.end();
    });

    t.end();
  });
  t.end();
});
