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

### 未解決の課題
- スクロールアニメーションが理想通りに動作しない（一旦放置）
- 参考サイト（https://www.greenbokujo.jp/）のような重なりアニメーションの実装が必要

### スクロールアニメーション実装手順（再実装時の参考）

#### 要件
1. 各カードは100vh
2. カードが表示されてから10vh分は固定（スクロールしても動かない）
3. その後20vh分のスクロールで次のカードが下から覆い被さる
4. 前のカードは絶対に動かない（position: fixedのような挙動）

#### 実装アプローチ
1. 各カードをposition: fixedで配置
2. 初期状態で2枚目以降のカードはtransform: translateY(100%)で画面外に
3. スクロール位置を監視し、適切なタイミングでtransformを変更
4. z-indexで重なり順を管理（後のカードほど上）

#### スクロール計算
- カード1: 0〜110vh（最後の10vhは固定表示）
- カード2: 110vh〜220vh（90vh〜110vhで出現アニメーション）
- カード3: 220vh〜330vh（200vh〜220vhで出現アニメーション）
- 以降同様

#### 注意点
- position: stickyではなくposition: fixedを使用
- transformのみでアニメーション（topやbottomは使わない）
- パフォーマンスのためrequestAnimationFrameを使用

## PDFファイル管理
- PDFファイルは `/public/pdf` フォルダに配置
- 現在のPDF: `二子玉川参考書紹介'25.pdf`

## 講師データ管理
- 講師プロフィールは `/app/data/instructors.ts` に定義
- 講師数: 13名（A〜M講師）
- 各講師には以下の情報を含む：
  - 出身校（中高）
  - 大学・学部
  - 担当科目
  - テーマカラー
  - 性別

## ボタンデザイン

### view more! ボタンのホバーエフェクト
- 回転する点線ボーダーを実装
- `.view-more-btn` クラスを適用
- ホバー時に点線が移動するアニメーション（ベルトコンベアのような動き）
- 実装詳細:
  - SVGを使用して4要素構成（左半円、右半円、上線、下線）
  - viewBox="0 0 100 100"で数値座標を使用
  - 数学的定義に基づく実装:
    - ボタン: 幅w、高さh、radius=h/2
    - ボタン中心を(0,0)として計算
    - 点線との距離: d = h * 0.10
    - 上下線のy座標: ±(d + h/2)
    - 直線の長さ: w - h
    - 左半円の中心: (-(w-h)/2, 0)、右半円の中心: ((w-h)/2, 0)
    - 半円の半径: h/2 + d
    - SVGサイズ: 幅 w + 2(r+d)、高さ h + 2d
    - viewBox(0-100)への変換計算を実施
  - strokeDasharray: "4.8 1.6"（実線部分が長く、透明部分が短い）
  - 半円のstrokeWidth: 0.8、上下の線のstrokeWidth: 0.8
  - vectorEffect="non-scaling-stroke"で線幅を保持
  - generateSVGPaths関数でボタンサイズに応じたパスを生成
  - useRefでボタンサイズを測定し、レスポンシブ対応
  - 各科目のcolorCodeを使用してボタンと同じ色の点線
  - ホバー時にstroke-dashoffset: -4vwで点線を大きく移動
  - 0.4秒のtransitionでスムーズなアニメーション

## 作業フロー（必須手順）

### 新しいタスクを受けたとき
1. **TodoListを作成**（3つのタスク）
   - メインタスク
   - 実装ガイドライン確認・更新
   - git commit & push

### タスク完了時のチェックリスト
- [ ] メインタスクが完了している
- [ ] 実装ガイドライン（CLAUDE.md）を確認・更新した
- [ ] git status → add → commit → push を実行した

### 忘れやすいポイント
- 実装後は必ず実装ガイドラインを更新
- 変更は必ずgitにcommit & push
- TodoListを使って進捗管理

## その他の注意事項
- 画像は `/public` フォルダに配置
- 環境変数は `.env.local` に記載（Vercelの環境変数設定も忘れずに）
- TypeScriptの型定義を積極的に使用する