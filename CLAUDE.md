# 実装ガイドライン

## カラーパレット使用規則

### 基本ルール
- **必ず定義済みのCSS変数を使用する** - 直接色コードを書かない
- 色は `/app/globals.css` に定義されているカラーパレットから選択する
- 新しい色が必要な場合は、まず既存のパレットから適切なものがないか確認する

### 色の使い分け
- **背景色**: `var(--white)`, `var(--gray)`, グラデーション用クラス
- **テキスト**: `var(--text-1)` (濃い), `var(--text-2)` (明るい), `var(--text-3)` (アクセント)
- **ボタン**: `.btn-primary`, `.btn-secondary` クラスを使用
- **科目別**: `.subject-[科目名]` クラスを使用

### 使用例
```css
/* 良い例 */
background-color: var(--main-1);
color: var(--text-1);

/* 悪い例 */
background-color: #635d73;
color: #373231;
```

## コンポーネント作成時の注意

### スタイリング
1. Tailwind CSSのクラスを優先的に使用
2. カスタムスタイルが必要な場合は、globals.cssに定義したユーティリティクラスを使用
3. インラインスタイルは避ける

### 命名規則
- コンポーネント: PascalCase (例: `MyComponent`)
- ファイル名: kebab-case (例: `my-component.tsx`)
- CSS クラス: kebab-case (例: `btn-primary`)
- CSS 変数: kebab-case (例: `--main-color`)

## ファイル構成
```
/app
  /components    # 共通コンポーネント
  /[page-name]   # ページ固有のファイル
  globals.css    # グローバルスタイル（カラーパレット定義）
  layout.tsx     # レイアウト
  page.tsx       # ホームページ
```

## 開発コマンド
- 開発サーバー起動: `npm run dev`
- ビルド: `npm run build`
- 型チェック: `npm run typecheck` (もし設定されていれば)
- リント: `npm run lint` (もし設定されていれば)

## Vercel デプロイ
- mainブランチにpushすると自動デプロイ
- プレビューデプロイはPRを作成すると生成される

## レスポンシブデザイン

### ブレークポイント
- **スマホ**: 375px〜428px
- **中間サイズ**: 428px〜768px（スマホとタブレットの中間的なデザイン）
- **タブレット**: 768px〜960px
- **PC**: 960px以上（タブレットデザインを中央配置、最大幅960px）

### サイズ指定のルール
- **px使用禁止**: 基本的にvw、vh、rem、%を使用
- **フォントサイズ**: clamp()関数またはvw単位を使用
- **スペーシング**: vw単位またはrem単位を使用
- **最大幅制限**: PC環境では`max-width: 960px`で中央配置

### 実装例
```css
/* 良い例 */
font-size: clamp(1rem, 4vw, 1.5rem);
padding: 3vw;
margin: 0 auto;
max-width: 960px;

/* 悪い例 */
font-size: 16px;
padding: 20px;
width: 768px;
```

### メディアクエリの優先順位
1. モバイルファーストで実装
2. 必要に応じて`min-width`でブレークポイントを追加
3. Tailwind CSSのレスポンシブプレフィックスを活用（sm:, md:, lg:）

## ホームページのスクロールアニメーション仕様

### 基本仕様
- 各科目カードは画面高さいっぱい（100vh）で表示
- position: stickyを使用した重なるアニメーション
- 前のカードは完全に固定され、次のカードが下から覆い被さるように出現

### カードの背景色
- 各科目のサブカラーを使用
  - 英語: `var(--english-sub)`
  - 数学: `var(--math-sub)`
  - 国語: `var(--japanese-sub)`
  - 理科: `var(--physics-sub)`
  - 社会: `var(--history-jp-sub)`

### アニメーション動作
- スマホ版：下から上へのスライド（fade-in-up）
- タブレット版：横からのスライドも混在（fade-in-left/right）
- スクロール時：前のカードは動かず、次のカードのみ移動

## その他の注意事項
- 画像は `/public` フォルダに配置
- 環境変数は `.env.local` に記載（Vercelの環境変数設定も忘れずに）
- TypeScriptの型定義を積極的に使用する