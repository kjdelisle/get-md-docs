#!/usr/bin/env node

'use strict';

const Config = require('../index').Config;
const main = require('../lib/main');

require('yargs')
  .command(
    '$0 [configPath]',
    `Retrieve markdown docs from a git repository.

    Note: This function does not currently support SSH
    notation: (git@<remote>:<org>/<repo>).

    Please use the HTTPS format instead: (https://<remote>/<org>/<repo>)
    `,
    yargs => {
      yargs.positional('configPath', {
        describe: 'path to config file'
      });
    },
    async argv => {
      let cfg = {};
      if (argv.configPath) {
        cfg = await Config.load(argv.configPath);
      } else {
        cfg = new Config({
          org: argv.org,
          repo: argv.repo,
          dest: argv.dest
        });
      }
      // Go get some docs!
      await main(cfg);
    }
  )
  .option('org', {
    alias: 'o',
    description: 'The organization or user on the remote server.'
  })
  .option('repo', {
    alias: 'r',
    description: 'The repository name.'
  })
  .option('dest', {
    alias: 'd',
    description: `The destination directory for the repository docs.
      If not specified, it will be placed into a folder made in the current
      directory, named after the source repository.`
  })
  .option('server', {
    alias: 's',
    description: 'The remote server to clone the repository from.',
    default: 'https://github.com'
  })
  .help('h')
  .alias('h', 'help').argv;
