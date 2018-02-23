'use strict';

const _ = require('lodash');
const path = require('path');
const tap = require('tap');

const mkTmpDir = require('../lib/utils').mkTmpDir;
const getAllMarkdownDocs = require('../lib/get-all-markdown-docs');
const writeAllMarkdownDocs = require('../lib/write-all-markdown-docs');

tap.test('write-all-markdown-docs', async t => {
  const docPath = path.resolve(__dirname, 'fixtures', 'fake-docs');
  const tmpDir = await mkTmpDir();
  const docs = await getAllMarkdownDocs(docPath);
  await writeAllMarkdownDocs(tmpDir, docs);
  const newDocs = await getAllMarkdownDocs(tmpDir);
  t.ok(newDocs, 'docs exist');
  t.ok(_.isEqual(docs, newDocs), 'docs are logically equivalent');
  t.end();
});
