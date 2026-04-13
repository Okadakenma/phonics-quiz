'use client';

type Props = {
  onStart: () => void;
};

export function GameStart({ onStart }: Props) {
  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <div className="text-center">
        <div className="text-6xl mb-4">🔤</div>
        <h1 className="text-3xl font-black text-stone-800 mb-2">
          フォニックス クイズ
        </h1>
        <p className="text-stone-500 text-base leading-relaxed">
          えを みて、さいしょの おとの<br />
          アルファベットを えらぼう！
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 w-full border border-stone-100">
        <ul className="space-y-2 text-stone-600 text-sm">
          <li>📝 ぜんぶで <span className="font-bold text-orange-500">26もん</span></li>
          <li>🎯 4つから えらぶよ</li>
          <li>🔊 おとも ながれるよ</li>
          <li>🔥 れんぞく せいかいで ストリーク！</li>
        </ul>
      </div>

      <button
        onClick={onStart}
        className="w-full py-4 rounded-2xl bg-orange-500 text-white text-xl font-black
                   shadow-lg shadow-orange-200 hover:bg-orange-600 active:scale-95
                   transition-all duration-200"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        はじめる 🚀
      </button>
    </div>
  );
}
