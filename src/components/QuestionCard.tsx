'use client';

import type { PhonicsWord, AnswerState } from '../types';

type Props = {
  word: PhonicsWord;
  answerState: AnswerState;
  onSpeak: () => void;
};

export function QuestionCard({ word, answerState, onSpeak }: Props) {
  const isAnswered = answerState !== 'unanswered';
  const borderColor = answerState === 'correct'
    ? 'border-green-400'
    : answerState === 'incorrect'
    ? 'border-red-400'
    : 'border-stone-100';

  return (
    <div className={`bg-white rounded-3xl border-4 ${borderColor} p-6 transition-colors duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-7xl leading-none" role="img" aria-label={word.word}>
          {word.emoji}
        </span>
        <button
          onClick={onSpeak}
          className="w-12 h-12 rounded-full bg-orange-100 text-orange-500 text-2xl
                     flex items-center justify-center
                     hover:bg-orange-200 active:scale-95 transition-all"
          style={{ WebkitTapHighlightColor: 'transparent' }}
          aria-label="もういちど きく"
        >
          🔊
        </button>
      </div>

      {!isAnswered ? (
        <p className="text-stone-700 text-lg font-bold leading-relaxed">
          この えの<br />
          さいしょの<br />
          おとは？
        </p>
      ) : (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-2xl font-black text-stone-800">{word.letter}</span>
          <span className="text-stone-400">→</span>
          <span className="text-xl font-bold text-orange-500">{word.phonicsEn}</span>
          <span className="text-sm text-stone-400">({word.phonicsJa})</span>
          <span className="text-stone-400">→</span>
          <span className="text-xl font-bold text-stone-700">{word.word}</span>
        </div>
      )}
    </div>
  );
}
