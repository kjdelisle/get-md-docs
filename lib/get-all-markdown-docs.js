'use strict';

const _ = require('lodash');
const debug = require('../lib/debug')('get-all-markdown-docs');
const promisify = require('util').promisify;
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);
const statAsync = promisify(fs.stat);

const readdirAsync = promisify(require('readdir-absolute'));

module.exports = async function getAllMarkdownDocs(docPath) {
  let docQueue = [docPath];
  let markdownDocs = {};
  while (docQueue.length > 0) {
    const dir = docQueue.shift();
    debug(`next target: ${dir}`);
    if (_.endsWith(dir, '.md')) {
      // We used the absolute path for recursive parsing, but we need to
      // ditch it now.
      let doc = await readFileAsync(dir, 'utf-8');
      let relPath = dir.substring(docPath.length, dir.length);
      debug(`Adding to docs: "${relPath}"`);
      markdownDocs[relPath] = doc;
    } else {
      const dirStat = await statAsync(dir);
      if (dirStat.isDirectory()) {
        // Queue 'em up!
        _.each(await readdirAsync(dir), x => {
          docQueue.push(x);
        });
      }
      // Otherwise, ignore it and move on.
    }
  }
  return markdownDocs;
};
