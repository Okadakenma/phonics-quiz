'use client';

import { useGameState } from '../hooks/useGameState';
import { GameStart } from '../components/GameStart';
import { GamePlay } from '../components/GamePlay';
import { GameResult } from '../components/GameResult';

export default function Home() {
  const { state, startGame, answer, nextQuestion, resetGame } = useGameState();

  return (
    <main className="min-h-screen flex items-start justify-center py-6 px-4">
      <div className="w-full max-w-[360px]">
        {state.phase === 'start' && (
          <GameStart onStart={startGame} />
        )}
        {state.phase === 'play' && (
          <GamePlay
            state={state}
            onAnswer={answer}
            onNext={nextQuestion}
          />
        )}
        {state.phase === 'result' && (
          <GameResult
            score={state.score}
            total={state.questions.length}
            maxStreak={state.maxStreak}
            onReplay={startGame}
            onHome={resetGame}
          />
        )}
      </div>
    </main>
  );
}
