'use client';

import { useState, useCallback } from 'react';
import type { GameState, GamePhase, AnswerState } from '../types';
import { buildQuestions } from '../lib/game-logic';
import { WORD_POOL, ALL_LETTERS } from '../data/phonics-words';

function initialState(): GameState {
  return {
    phase: 'start',
    questions: [],
    currentIndex: 0,
    score: 0,
    streak: 0,
    maxStreak: 0,
    answerState: 'unanswered',
    selectedLetter: null,
  };
}

export function useGameState() {
  const [state, setState] = useState<GameState>(initialState);

  const startGame = useCallback(() => {
    setState({
      phase: 'play',
      questions: buildQuestions(WORD_POOL, ALL_LETTERS),
      currentIndex: 0,
      score: 0,
      streak: 0,
      maxStreak: 0,
      answerState: 'unanswered',
      selectedLetter: null,
    });
  }, []);

  const answer = useCallback((letter: string) => {
    setState(prev => {
      if (prev.answerState !== 'unanswered') return prev;
      const correct = prev.questions[prev.currentIndex].word.letter;
      const isCorrect = letter === correct;
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      return {
        ...prev,
        answerState: isCorrect ? 'correct' : 'incorrect',
        selectedLetter: letter,
        score: isCorrect ? prev.score + 1 : prev.score,
        streak: newStreak,
        maxStreak: Math.max(prev.maxStreak, newStreak),
      };
    });
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => {
      const nextIndex = prev.currentIndex + 1;
      if (nextIndex >= prev.questions.length) {
        return { ...prev, phase: 'result' };
      }
      return {
        ...prev,
        currentIndex: nextIndex,
        answerState: 'unanswered',
        selectedLetter: null,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setState(initialState());
  }, []);

  return { state, startGame, answer, nextQuestion, resetGame };
}
