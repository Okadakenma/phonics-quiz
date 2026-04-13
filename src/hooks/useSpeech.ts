'use client';

import { useCallback } from 'react';
import { speakWord as _speakWord, speakPhonicsSequence } from '../lib/audio-player';

export function useSpeech() {
  const speakWord = useCallback((word: string) => {
    _speakWord(word);
  }, []);

  const speakSequence = useCallback(
    (phonicsEn: string, letter: string, word: string): Promise<void> => {
      return speakPhonicsSequence(phonicsEn, letter, word);
    },
    []
  );

  return { speakWord, speakSequence };
}
