import { shuffle, randomPick, generateChoices, buildQuestions } from '../lib/game-logic';
import { WORD_POOL, ALL_LETTERS } from '../data/phonics-words';

describe('shuffle', () => {
  it('should return an array with the same elements', () => {
    const arr = ['A', 'B', 'C', 'D', 'E'];
    const result = shuffle([...arr]);
    expect(result).toHaveLength(arr.length);
    expect(result.sort()).toEqual(arr.sort());
  });

  it('should not mutate the original array', () => {
    const arr = ['A', 'B', 'C'];
    const copy = [...arr];
    shuffle(arr);
    expect(arr).toEqual(copy);
  });
});

describe('randomPick', () => {
  it('should return an element from the array', () => {
    const arr = [1, 2, 3, 4, 5];
    const result = randomPick(arr);
    expect(arr).toContain(result);
  });
});

describe('generateChoices', () => {
  it('should return 4 choices including the correct letter', () => {
    const choices = generateChoices('A', ALL_LETTERS);
    expect(choices).toHaveLength(4);
    expect(choices).toContain('A');
  });

  it('should not have duplicate choices', () => {
    const choices = generateChoices('A', ALL_LETTERS);
    const unique = new Set(choices);
    expect(unique.size).toBe(4);
  });

  it('should only contain valid letters', () => {
    const choices = generateChoices('M', ALL_LETTERS);
    choices.forEach(c => expect(ALL_LETTERS).toContain(c));
  });
});

describe('buildQuestions', () => {
  it('should return 26 questions', () => {
    const questions = buildQuestions(WORD_POOL, ALL_LETTERS);
    expect(questions).toHaveLength(26);
  });

  it('should cover all 26 letters exactly once', () => {
    const questions = buildQuestions(WORD_POOL, ALL_LETTERS);
    const letters = questions.map(q => q.word.letter).sort();
    expect(letters).toEqual([...ALL_LETTERS].sort());
  });

  it('each question should have 4 choices including the correct letter', () => {
    const questions = buildQuestions(WORD_POOL, ALL_LETTERS);
    questions.forEach(q => {
      expect(q.choices).toHaveLength(4);
      expect(q.choices).toContain(q.word.letter);
    });
  });
});
