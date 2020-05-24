# Dancing☆Onigiriエディター(CW Edition対応)

Vue.js + TypeScript 製の [Dancing☆Onigiri](https://github.com/cwtickle/danoniplus) エディターです。
必要な機能については順次実装していきます。

## 使い方
- キー操作
  - ノート打ち込み: 各種キー
    - 5key: J, K, I, L, F
    - 7key: S, D, F, G, J, K, L
    - 11key: S, D, F, G, J, K, L, U, I, 8, O
  - フリーズノート打ち込み: `Shift` + 各種キー
  - 上下移動: 上下方向キー、`Space`(上方向)
  - ページ移動: 左右方向キー
  - 5ページ移動: `Shift` + 左右方向キー
  - 打ち込み間隔変更: `Ctrl` + 1,2,3,4,5,6,7
    - 1: 4分
    - 2: 8分
    - 3: 16分
    - 4: 12分
    - 5: 24分
    - 6: 32分
    - 7: 48分

- マウス操作
  - ページ、ラベル移動: 各種ボタン（◁, ▷）
  - 途中のBPM、FirstNum変更: Labelにチェックを入れて数値を変更する
  - ダンおにデータ出力: GOボタン(クリップボードにコピーされています)
  - セーブデータ(JSON)出力: SAVEボタン(クリップボードにコピーされています)
    - ロード機能は未実装

## 開発者向け

プロジェクトスタート
```
npm install
```

ローカルサーバ起動
```
npm run serve
```

ビルド
```
npm run build
```
