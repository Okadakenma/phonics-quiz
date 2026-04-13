export type PhonicsWord = {
  letter: string;
  word: string;
  emoji: string;
  phonicsEn: string;
  phonicsJa: string;
};

export type GamePhase = 'start' | 'play' | 'result';

export type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export type Question = {
  word: PhonicsWord;
  choices: string[]; // 4つのアルファベット文字
};

export type GameState = {
  phase: GamePhase;
  questions: Question[];
  currentIndex: number;
  score: number;
  streak: number;
  maxStreak: number;
  answerState: AnswerState;
  selectedLetter: string | null;
};
