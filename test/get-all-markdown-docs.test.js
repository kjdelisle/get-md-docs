'use strict';

const tap = require('tap');
const path = require('path');
const getAllMarkdownDocs = require('../lib/get-all-markdown-docs');

tap.test('get-all-markdown-docs', async t => {
  const results = await getAllMarkdownDocs(
    path.resolve(__dirname, 'fixtures', 'fake-docs')
  );
  t.ok(results, 'results were returned');
  t.ok(Object.keys(results).length > 0, 'document collection was not empty');
  t.ok(results['/flavours/chocolate.md'], 'chocolate was included');
  t.ok(results['/flavours/vanilla.md'], 'vanilla was included');
  t.ok(results['/ice-cream.md'], 'ice-cream was included');
  t.end();
});
