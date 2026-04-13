function sanitize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function playAudio(src: string): Promise<void> {
  return new Promise(resolve => {
    const audio = new Audio(src);
    audio.onended = () => resolve();
    audio.onerror = () => resolve();
    audio.play().catch(() => resolve());
  });
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function speakWord(word: string): void {
  playAudio(`/audio/words/${sanitize(word)}.mp3`);
}

export async function speakPhonicsSequence(
  phonicsEn: string,
  letter: string,
  word: string
): Promise<void> {
  // Step 1: アルファベット名
  await playAudio(`/audio/letters/${letter.toLowerCase()}.mp3`);
  await delay(300);
  // Step 2: フォニックス音
  await playAudio(`/audio/phonics/${sanitize(phonicsEn)}.mp3`);
  await delay(350);
  // Step 3: 英単語
  await playAudio(`/audio/words/${sanitize(word)}.mp3`);
}
