'use strict';

const _ = require('lodash');
const fs = require('fs');
const os = require('os');
const path = require('path');
const promisify = require('util').promisify;
const tap = require('tap');

const crypto = require('crypto');
const mkdirAsync = promisify(fs.mkdir);

const getAllMarkdownDocs = require('../lib/get-all-markdown-docs');
const writeAllMarkdownDocs = require('../lib/write-all-markdown-docs');

tap.test('write-all-markdown-docs', async t => {
  const tmpDir = path.join(os.tmpdir(), crypto.randomBytes(32).toString('hex'));
  await mkdirAsync(tmpDir);
  const docPath = path.resolve(__dirname, 'fixtures', 'fake-docs');

  const docs = await getAllMarkdownDocs(docPath);
  await writeAllMarkdownDocs(tmpDir, docs);
  const newDocs = await getAllMarkdownDocs(tmpDir);
  t.ok(newDocs, 'docs exist');
  t.ok(_.isEqual(docs, newDocs), 'docs are logically equivalent');
  t.end();
});
