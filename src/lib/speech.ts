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

// TTS がアルファベット個別読みしてしまうフォニックス音の変換マップ
// 表示用の phonicsEn はそのまま残し、読み上げ用だけ変換する
const PHONICS_TTS_MAP: Record<string, string> = {
  'ah':   'aah',    // A (open mouth "aah")
  'buh':  'buh',
  'kuh':  'kuh',
  'duh':  'duh',
  'eh':   'ehh',    // E
  'fuh':  'fuh',
  'guh':  'guh',
  'huh':  'huh',
  'ih':   'ihh',    // I (TTS が i-h と読まないよう)
  'juh':  'juh',
  'kwuh': 'qu',     // Q: "qu" → TTS が /kw/ と読む
  'luh':  'luh',
  'muh':  'muh',
  'nuh':  'nuh',
  'puh':  'puh',
  'ruh':  'ruh',
  'suh':  'suh',
  'tuh':  'tuh',
  'uh':   'uhh',    // U
  'vuh':  'vuh',
  'wuh':  'wuh',
  'ks':   'x',      // X: "x" → TTS が /eks/ と読む（ks単体より自然）
  'yuh':  'yuh',
  'zuh':  'zuh',
};

export async function speakPhonicsSequence(
  phonicsEn: string,
  letter: string,
  word: string,
  voice: SpeechSynthesisVoice | null
): Promise<void> {
  const ttsPhonics = PHONICS_TTS_MAP[phonicsEn] ?? phonicsEn;
  // Step 1: フォニックス音
  await speak(ttsPhonics, { rate: 0.6, pitch: 1.2, voice });
  await delay(350);
  // Step 2: アルファベット名（小文字で渡す）
  await speak(letter.toLowerCase(), { rate: 0.7, pitch: 1.1, voice });
  await delay(300);
  // Step 3: 英単語
  await speak(word, { rate: 0.75, pitch: 1.1, voice });
}
