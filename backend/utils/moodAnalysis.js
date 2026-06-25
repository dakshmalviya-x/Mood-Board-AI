const moodLexicon = {
  calm: { score: 7, emotion: 'calm', colors: ['#8b5cf6', '#22d3ee', '#fef3c7'], keywords: ['calm', 'steady', 'grounded', 'peace'] },
  happy: { score: 8, emotion: 'happy', colors: ['#f59e0b', '#f472b6', '#34d399'], keywords: ['joy', 'bright', 'grateful', 'light'] },
  motivated: { score: 7, emotion: 'motivated', colors: ['#3b82f6', '#14b8a6', '#a78bfa'], keywords: ['drive', 'focus', 'energy', 'progress'] },
  sad: { score: 4, emotion: 'sad', colors: ['#64748b', '#60a5fa', '#e2e8f0'], keywords: ['heavy', 'quiet', 'tired', 'still'] },
  stressed: { score: 3, emotion: 'stressed', colors: ['#ef4444', '#fb923c', '#facc15'], keywords: ['stress', 'pressure', 'overload', 'tense'] },
  hopeful: { score: 6, emotion: 'hopeful', colors: ['#38bdf8', '#a78bfa', '#fde68a'], keywords: ['hope', 'trust', 'future', 'gentle'] },
};

function analyzeMoodText(text) {
  const normalized = text.toLowerCase();
  const detected = [];

  if (/(calm|peaceful|steady|grounded|grateful|relaxed)/.test(normalized)) detected.push('calm');
  if (/(happy|joy|excited|great|wonderful|delighted|love)/.test(normalized)) detected.push('happy');
  if (/(motivated|drive|focused|productive|determined|energetic)/.test(normalized)) detected.push('motivated');
  if (/(sad|hurt|lonely|down|tired|empty|depressed)/.test(normalized)) detected.push('sad');
  if (/(stress|stressed|anxious|overwhelmed|panic|pressure|tense)/.test(normalized)) detected.push('stressed');
  if (/(hope|hopeful|better|tomorrow|healing|optimistic)/.test(normalized)) detected.push('hopeful');

  const primary = detected[0] || (/(good|better|bright|glad)/.test(normalized) ? 'happy' : 'hopeful');
  const base = moodLexicon[primary];

  let score = base.score;
  if (detected.includes('stressed') || detected.includes('sad')) score = Math.min(score, 5);
  if (detected.includes('calm') || detected.includes('hopeful')) score = Math.max(score, 6);
  if (detected.includes('happy')) score = Math.max(score, 8);

  const summary = buildSummary(base.emotion, score, normalized);

  return {
    emotion: base.emotion,
    score,
    colors: base.colors,
    keywords: base.keywords,
    summary,
  };
}

function buildSummary(emotion, score, text) {
  const themes = {
    calm: 'A calm and reflective tone is coming through, with a gentle sense of steadiness.',
    happy: 'The entry carries warmth and light, suggesting a genuinely uplifting mood.',
    motivated: 'There is clear momentum here, with energy and intention shaping the moment.',
    sad: 'The language feels tender and heavy, pointing to a quieter emotional weight.',
    stressed: 'The words suggest pressure and strain, with tension guiding the feeling.',
    hopeful: 'There is a soft sense of possibility, as though hope is quietly holding the moment together.',
  };

  const sentiment = score >= 8 ? 'bright' : score >= 6 ? 'steady' : score >= 4 ? 'mixed' : 'heavy';
  return `${themes[emotion]} It reads as ${sentiment} with a mood score of ${score}/10.`;
}

module.exports = { analyzeMoodText };
