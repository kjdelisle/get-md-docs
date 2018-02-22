'use strict';

const _ = require('lodash');
const fs = require('fs-extra');
const path = require('path');

const outputFile = fs.outputFile;

/**
 *
 * @param {string} basePath The basePath
 * @param {object} markdownDocs The object that contains all of the relative
 * paths and the markdown docs text.
 */
module.exports = async function writeAllMarkdownDocs(basePath, markdownDocs) {
  for (const relPath in markdownDocs) {
    const doc = markdownDocs[relPath];
    await outputFile(path.join(basePath, relPath), doc, 'utf-8');
  }
};
