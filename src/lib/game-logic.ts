import type { PhonicsWord, Question } from '../types';

export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateChoices(correctLetter: string, allLetters: string[]): string[] {
  const others = shuffle(allLetters.filter(l => l !== correctLetter)).slice(0, 3);
  return shuffle([correctLetter, ...others]);
}

export function buildQuestions(
  wordPool: Record<string, PhonicsWord[]>,
  allLetters: string[]
): Question[] {
  const shuffledLetters = shuffle(allLetters);
  return shuffledLetters.map(letter => ({
    word: randomPick(wordPool[letter]),
    choices: generateChoices(letter, allLetters),
  }));
}
