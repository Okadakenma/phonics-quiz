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
// TTS が認識できる実際の英単語・一般的な間投詞を使用
const PHONICS_TTS_MAP: Record<string, string> = {
  'ah':   'aah',    // A: 間投詞
  'buh':  'buh',    // B
  'kuh':  'kuh',    // C/K
  'duh':  'duh',    // D: 間投詞として認識
  'eh':   'eh',     // E: 間投詞
  'fuh':  'fuh',    // F
  'guh':  'guh',    // G
  'huh':  'huh',    // H: 間投詞
  'ih':   'in',     // I: "in" の頭音 /ɪ/
  'juh':  'juh',    // J
  'kwuh': 'qu',     // Q: /kw/
  'luh':  'luh',    // L
  'muh':  'muh',    // M
  'nuh':  'nuh',    // N
  'puh':  'puh',    // P
  'ruh':  'ruh',    // R
  'suh':  'sss',    // S: "sss" → TTS が /s/ の連続音として読む
  'tuh':  'tuh',    // T
  'uh':   'uh',     // U: 間投詞
  'vuh':  'vuh',    // V
  'wuh':  'wuh',    // W
  'ks':   'x',      // X: /eks/
  'yuh':  'yuh',    // Y
  'zuh':  'zzz',    // Z: "zzz" → TTS が /z/ の連続音（蜂の羽音）として読む
};

export async function speakPhonicsSequence(
  phonicsEn: string,
  letter: string,
  word: string,
  voice: SpeechSynthesisVoice | null
): Promise<void> {
  const ttsPhonics = PHONICS_TTS_MAP[phonicsEn] ?? phonicsEn;
  // Step 1: アルファベット名（小文字で渡す）
  await speak(letter.toLowerCase(), { rate: 0.7, pitch: 1.1, voice });
  await delay(300);
  // Step 2: フォニックス音
  await speak(ttsPhonics, { rate: 0.6, pitch: 1.2, voice });
  await delay(350);
  // Step 3: 英単語
  await speak(word, { rate: 0.75, pitch: 1.1, voice });
}
