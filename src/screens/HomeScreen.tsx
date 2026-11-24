import type { LevelResult } from './LevelScreen';

interface HomeScreenProps {
  lastResult?: LevelResult;
  onPlayLevel: () => void;
}

/**
 * Phase 1 landing screen: shows the result of the last completed
 * level (if any) and offers to play/replay Level 1. Level select
 * for multiple levels arrives in Phase 2.
 */
export function HomeScreen({ lastResult, onPlayLevel }: HomeScreenProps) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 'var(--space-6)',
      gap: 'var(--space-5)',
    }}>
      {lastResult ? (
        <>
          <h2>Level {lastResult.levelId} complete! 🎉</h2>
          <p style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', color: 'var(--toki-teal-shadow)', margin: 0 }}>
            {lastResult.score} pts
          </p>
          {lastResult.reasoningBonusEarned && (
            <p style={{ color: 'var(--color-text-secondary)' }}>+ Reasoning bonus earned</p>
          )}
          {lastResult.badgesEarned.length > 0 && (
            <p style={{ color: 'var(--color-text-secondary)' }}>
              🏅 Badge unlocked: {lastResult.badgesEarned.join(', ')}
            </p>
          )}
        </>
      ) : (
        <h2>Ready for your first visit?</h2>
      )}

      <button
        onClick={onPlayLevel}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-lg)',
          fontWeight: 700,
          color: 'white',
          background: 'var(--color-action-primary)',
          border: 'none',
          borderRadius: 'var(--radius-pill)',
          padding: 'var(--space-4) var(--space-7)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {lastResult ? 'Replay Level 1' : 'Enter the Classroom'}
      </button>
    </div>
  );
}
