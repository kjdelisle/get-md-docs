'use strict';

const getRepo = require('./index').getRepo;
const getAllMarkdownDocs = require('./index').getAllMarkdownDocs;
const writeAllMarkdownDocs = require('./index').writeAllMarkdownDocs;

/**
 * The main driver function for get-docs.
 * This function retrieves the repository, reads the markdown docs
 * then writes them to the destination.
 * @param {Config} cfg
 */
module.exports = async function main(cfg) {
  const repoDir = await getRepo(cfg);
  const docs = await getAllMarkdownDocs(repoDir);
  await writeAllMarkdownDocs(cfg.dest, docs);
};
