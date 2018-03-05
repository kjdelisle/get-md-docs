'use strict';

const debug = require('../lib/debug')('get-all-markdown-docs');
const promisify = require('util').promisify;
const glob = promisify(require('glob'));
const path = require('path');
const fs = require('fs');
const readFileAsync = promisify(fs.readFile);

module.exports = async function getAllMarkdownDocs(docPath) {
  debug(`retrieving docs from ${docPath}`);
  let contents = {};
  const docs = await glob(path.join(docPath, '**/*.md'),
    { matchBase: true });
  for (const doc of docs) {
    let content = await readFileAsync(doc, 'utf-8');
    let relPath = doc.substring(docPath.length, doc.length);
    contents[relPath] = content;
  }
  return contents;
};
