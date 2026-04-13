'use client';

import { useEffect, useRef, useCallback } from 'react';
import { speak, speakPhonicsSequence } from '../lib/speech';

export function useSpeech() {
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      // 高品質な音声を優先順に選択
      const preferred = [
        'Google US English',   // Chrome
        'Samantha',            // macOS/iOS Safari
        'Alex',                // macOS
        'Microsoft Zira',      // Windows
      ];
      let chosen: SpeechSynthesisVoice | null = null;
      for (const name of preferred) {
        const v = voices.find(v => v.name === name);
        if (v) { chosen = v; break; }
      }
      if (!chosen) {
        chosen = voices.find(v => v.lang === 'en-US') ?? null;
      }
      voiceRef.current = chosen;
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
