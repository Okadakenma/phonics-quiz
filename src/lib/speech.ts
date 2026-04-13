export function speak(
  text: string,
  options: { rate?: number; pitch?: number; voice?: SpeechSynthesisVoice | null } = {}
): Promise<void> {
  return new Promise(resolve => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve();
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = options.rate ?? 0.75;
    utterance.pitch = options.pitch ?? 1.0;
    if (options.voice) utterance.voice = options.voice;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function speakPhonicsSequence(
  phonicsEn: string,
  letter: string,
  word: string,
  voice: SpeechSynthesisVoice | null
): Promise<void> {
  // Step 1: フォニックス音
  await speak(phonicsEn, { rate: 0.6, pitch: 1.2, voice });
  await delay(350);
  // Step 2: アルファベット名（小文字で渡す）
  await speak(letter.toLowerCase(), { rate: 0.7, pitch: 1.1, voice });
  await delay(300);
  // Step 3: 英単語
  await speak(word, { rate: 0.75, pitch: 1.1, voice });
}
