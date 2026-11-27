import assert from 'node:assert/strict';

import test from 'node:test';
import { draftPanel } from './app.mjs';
test('counts all displayed words and preserves paragraph breaks', () => {
  const panel = draftPanel({title:"A clock",body:"A dial.\n\nAn arrow.",caption:"Mock exhibit"}, 20);
  assert.deepEqual(panel.paragraphs, ["A dial.", "An arrow."]);
  assert.equal(panel.count, 8);
  assert.equal(panel.remaining, 12);
  assert.equal(panel.readingSeconds, 4);
});
test('reports over-budget text and validates the target', () => {
  const payload = {title:"",body:"word ".repeat(21),caption:""};
  assert.equal(draftPanel(payload, 20).remaining, -1);
  assert.throws(() => draftPanel(payload, 19));
});
