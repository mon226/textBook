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

## その他の注意事項
- 画像は `/public` フォルダに配置
- 環境変数は `.env.local` に記載（Vercelの環境変数設定も忘れずに）
- TypeScriptの型定義を積極的に使用する