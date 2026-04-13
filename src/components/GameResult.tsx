'use client';

type Props = {
  score: number;
  total: number;
  maxStreak: number;
  onReplay: () => void;
  onHome: () => void;
};

export function GameResult({ score, total, maxStreak, onReplay, onHome }: Props) {
  const perfect = score === total;

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="text-6xl">{perfect ? '🏆' : score >= total * 0.8 ? '🌟' : '💪'}</div>
      <h2 className="text-2xl font-black text-stone-800">
        {perfect ? 'かんぺき！' : 'よくできました！'}
      </h2>

      <div className="bg-white rounded-3xl p-6 w-full border border-stone-100 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-stone-600 font-bold">せいかい</span>
          <span className="text-2xl font-black text-orange-500">
            {score} / {total}
          </span>
        </div>
        <div className="w-full bg-stone-200 rounded-full h-3">
          <div
            className="h-full bg-orange-400 rounded-full"
            style={{ width: `${Math.round((score / total) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-stone-600 font-bold">さいこうれんぞく</span>
          <span className="text-2xl font-black text-orange-500">🔥 {maxStreak}</span>
        </div>
      </div>

      <button
        onClick={onReplay}
        className="w-full py-4 rounded-2xl bg-orange-500 text-white text-xl font-black
                   shadow-lg shadow-orange-200 hover:bg-orange-600 active:scale-95
                   transition-all duration-200"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        もういちど 🔄
      </button>

      <button
        onClick={onHome}
        className="w-full py-3 rounded-2xl border-2 border-stone-200 text-stone-600
                   text-lg font-bold hover:bg-stone-50 active:scale-95 transition-all"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        スタートへ
      </button>
    </div>
  );
}
