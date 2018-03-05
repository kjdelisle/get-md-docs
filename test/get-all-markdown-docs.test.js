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
  t.contains(results['/flavours/chocolate.md'], 'Mmm, chocolate',
    'chocolate was included');
  t.contains(results['/flavours/vanilla.md'], 'it\'s also got vanilla in it!',
    'vanilla was included');
  t.contains(results['/ice-cream.md'], 'the only 2 flavours of ice cream',
    'ice-cream was included');
  t.end();
});
