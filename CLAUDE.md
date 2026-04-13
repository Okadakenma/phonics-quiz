@AGENTS.md

# Phonics Quiz

7歳の子ども向けフォニックス学習クイズアプリ。

## 技術スタック
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Web Speech API + Web Audio API
- Vercel デプロイ

## 開発コマンド
- `npm run dev` — 開発サーバー起動
- `npm run build` — ビルド
- `npm run lint` — Lint実行
- `npm test` — ゲームロジックテスト

## ディレクトリ構成
- `src/data/phonics-words.ts` — 単語プール（ここだけ編集すれば単語追加可能）
- `src/components/` — UI コンポーネント
- `src/hooks/` — カスタムフック
- `src/lib/` — ユーティリティ（音声、効果音、ゲームロジック）

## 重要な仕様
- Web Speech APIで英単語・フォニックス音を読み上げ
- アルファベット名は小文字で渡す（"capital B" 防止）
- 効果音はWeb Audio APIで生成（外部ファイル不要）
- 認証・DB不要。状態はセッション内のみ
- UIテキストは全てひらがな（対象年齢7歳）
