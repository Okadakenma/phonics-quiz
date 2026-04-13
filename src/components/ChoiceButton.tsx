'use client';

import type { AnswerState } from '../types';

type Props = {
  letter: string;
  correctLetter: string;
  answerState: AnswerState;
  selectedLetter: string | null;
  onClick: (letter: string) => void;
};

export function ChoiceButton({ letter, correctLetter, answerState, selectedLetter, onClick }: Props) {
  const isAnswered = answerState !== 'unanswered';
  const isCorrect = letter === correctLetter;
  const isSelected = letter === selectedLetter;

  let colorClass = 'bg-white border-stone-200 text-stone-800 active:scale-95';
  if (isAnswered) {
    if (isCorrect) {
      colorClass = 'bg-green-100 border-green-500 text-green-700';
    } else if (isSelected) {
      colorClass = 'bg-red-100 border-red-500 text-red-700';
    } else {
      colorClass = 'bg-stone-100 border-stone-200 text-stone-400';
    }
  }

  return (
    <button
      onClick={() => !isAnswered && onClick(letter)}
      disabled={isAnswered}
      className={`
        w-full min-h-[56px] rounded-2xl border-2 font-bold text-3xl
        transition-all duration-200 select-none
        ${colorClass}
        ${!isAnswered ? 'hover:border-orange-400 hover:bg-orange-50 cursor-pointer' : 'cursor-default'}
      `}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {letter}
    </button>
  );
}
