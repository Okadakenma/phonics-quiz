'use client';

import { useEffect, useRef, useCallback } from 'react';
import { speak, speakPhonicsSequence } from '../lib/speech';

export function useSpeech() {
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const en = voices.find(v => v.lang.startsWith('en') && !v.name.includes('Google UK'));
      voiceRef.current = en ?? voices[0] ?? null;
    };

    loadVoice();
    window.speechSynthesis.onvoiceschanged = loadVoice;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speakWord = useCallback((word: string) => {
    speak(word, { rate: 0.75, pitch: 1.0, voice: voiceRef.current });
  }, []);

  const speakSequence = useCallback((phonicsEn: string, letter: string, word: string) => {
    speakPhonicsSequence(phonicsEn, letter, word, voiceRef.current);
  }, []);

  return { speakWord, speakSequence };
}
