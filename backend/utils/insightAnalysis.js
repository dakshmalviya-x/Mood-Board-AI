function generateInsights(entries) {
  if (!entries || entries.length === 0) {
    return 'Write a few journal entries to start seeing a meaningful pattern.';
  }

  const emotions = entries.map((entry) => entry.mood?.emotion || 'hopeful');
  const scores = entries.map((entry) => entry.mood?.score || 5);
  const avgScore = Math.round((scores.reduce((sum, score) => sum + score, 0) / scores.length) * 10) / 10;

  const positiveCount = emotions.filter((emotion) => ['happy', 'calm', 'motivated', 'hopeful'].includes(emotion)).length;
  const stressCount = emotions.filter((emotion) => ['stressed', 'sad'].includes(emotion)).length;

  let trend = 'Your entries suggest a grounded and reflective rhythm.';
  if (avgScore >= 7) trend = 'Your entries lean toward warmth, energy, and steadiness.';
  else if (avgScore <= 4) trend = 'Your entries show a heavier emotional season, and that deserves gentleness.';
  else if (positiveCount < stressCount) trend = 'Your entries show a mix of strain and resilience, with the hard moments standing out.';

  let stressPattern = 'You seem to be finding steadiness through your own observations.';
  if (stressCount > 0) stressPattern = 'Stress appears in some of your entries, especially when your thoughts feel crowded or heavy.';

  let motivationPattern = 'Your reflections show a thoughtful pace and a quiet willingness to move forward.';
  if (positiveCount > stressCount) motivationPattern = 'Your notes often carry a strong sense of momentum and self-awareness.';

  return [
    `Overall trend: ${trend}`,
    `Stress pattern: ${stressPattern}`,
    `Motivation pattern: ${motivationPattern}`,
    'Encouraging insight: You are paying attention to your inner world, and that awareness itself is a form of care.',
  ].join('\n');
}

module.exports = { generateInsights };
