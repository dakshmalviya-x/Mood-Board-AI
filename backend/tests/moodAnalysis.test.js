const test = require('node:test');
const assert = require('node:assert/strict');
const { analyzeMoodText } = require('../utils/moodAnalysis');

test('creates a structured mood summary from plain text', () => {
  const result = analyzeMoodText('I felt calm and grateful after a long walk today.');

  assert.equal(typeof result.emotion, 'string');
  assert.ok(result.score >= 1 && result.score <= 10);
  assert.equal(Array.isArray(result.colors), true);
  assert.equal(Array.isArray(result.keywords), true);
  assert.equal(result.keywords.length, 4);
  assert.equal(typeof result.summary, 'string');
});

test('detects stress and lowers the mood score', () => {
  const result = analyzeMoodText('I am overwhelmed and anxious about everything today.');

  assert.ok(['stressed', 'sad'].includes(result.emotion));
  assert.ok(result.score <= 5);
});
