'use client';

import { useEffect, useCallback } from 'react';
import type { GameState } from '../types';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { ChoiceButton } from './ChoiceButton';
import { useSpeech } from '../hooks/useSpeech';
import { playCorrectSound, playIncorrectSound } from '../lib/sound';

type Props = {
  state: GameState;
  onAnswer: (letter: string) => void;
  onNext: () => void;
};

export function GamePlay({ state, onAnswer, onNext }: Props) {
  const { speakWord, speakSequence } = useSpeech();
  const { questions, currentIndex, score, streak, answerState, selectedLetter } = state;
  const question = questions[currentIndex];
  const { word, choices } = question;

  // 問題表示時: 400ms後に単語読み上げ
  useEffect(() => {
    if (answerState !== 'unanswered') return;
    const t = setTimeout(() => speakWord(word.word), 400);
    return () => clearTimeout(t);
  }, [currentIndex, answerState, word.word, speakWord]);

  // 回答後: 効果音 + フォニックス読み上げ + 次の問題へ遷移
  const { phonicsEn, letter, word: wordText } = word;
  useEffect(() => {
    if (answerState === 'unanswered') return;

    const isCorrect = answerState === 'correct';

    // 効果音（即時）
    if (isCorrect) playCorrectSound();
    else playIncorrectSound();

    // フォニックス読み上げ
    const speakDelay = isCorrect ? 300 : 600;
    const speakTimer = setTimeout(() => {
      speakSequence(phonicsEn, letter, wordText);
    }, speakDelay);

    // 次の問題へ
    const nextDelay = isCorrect ? 3000 : 3800;
    const nextTimer = setTimeout(() => onNext(), nextDelay);

    return () => {
      clearTimeout(speakTimer);
      clearTimeout(nextTimer);
    };
  }, [answerState, phonicsEn, letter, wordText, speakSequence, onNext]);

  const handleSpeak = useCallback(() => {
    if (answerState === 'unanswered') {
      speakWord(wordText);
    } else {
      speakSequence(phonicsEn, letter, wordText);
    }
  }, [answerState, phonicsEn, letter, wordText, speakWord, speakSequence]);

  return (
    <div className="flex flex-col gap-4">
      {/* ヘッダー: 進捗・ストリーク・スコア */}
      <div className="flex items-center justify-between text-sm font-bold text-stone-600">
        <span>{currentIndex + 1} / {questions.length}</span>
        {streak >= 2 && (
          <span className="text-orange-500">🔥 {streak}れんぞく！</span>
        )}
        <span>⭐ {score}</span>
      </div>

      {/* プログレスバー */}
      <ProgressBar current={currentIndex + 1} total={questions.length} />

      {/* 問題カード */}
      <QuestionCard
        word={word}
        answerState={answerState}
        onSpeak={handleSpeak}
      />

      {/* 4択ボタン */}
      <div className="grid grid-cols-2 gap-3">
        {choices.map(letter => (
          <ChoiceButton
            key={letter}
            letter={letter}
            correctLetter={word.letter}
            answerState={answerState}
            selectedLetter={selectedLetter}
            onClick={onAnswer}
          />
        ))}
      </div>
    </div>
  );
}
