# Dancing☆Onigiriエディター(CW Edition対応)

サイト: [https://superkuppabros.github.io/danoni-editor/](https://superkuppabros.github.io/danoni-editor/)

Vue.js + TypeScript 製の [Dancing☆Onigiri](https://github.com/cwtickle/danoniplus) エディターです。  
Google Chromeにて動作を確認しています。  
必要な機能については順次実装していきます。  

既知のバグについてはIssueをご覧ください。
その他のバグ報告はissue, PRかTwitter(@superkuppabros)までお願いします。

## 使い方
- キー操作
  - ノート打ち込み: 各種キー

    <details>
    <summary>対応タイプ一覧表</summary>

    |タイプ|使用するキー|
    |--|--|
    |5key| J, K, I, L, F|
    |7key| S, D, F, G, J, K, L|
    |8key| S, D, F, G, J, K, L, ;|
    |9Akey| S, D, E, F, G, J, K, I, L|
    |9Bkey| A, S, D, F, G, J, K, L, ;|
    |9ikey| A, S, D, F, G, J, K, I, L|
    |11key| S, D, F, G, J, K, L, U, I, 8, O|
    |11Lkey| W, E, 3, R, S, D, F, G, J, K, L|
    |11Wkey| S, D, F, G, J, K, L, 2, T, Y, 0|
    |11ikey| S, C, D, E, F, G, J, M, K, I, L|
    |12key| B, N, J, M, K, <, L, >, U, I, 8, O|
    |13key| A, S, D, F, G, J, K, L, ;, U, I, 8, O|
    |14key| B, N, J, M, K, <, L, >, Y, U, I, 8, O, P|
    |14ikey| Z, X, C, S, D, F, G, J, K, L, U, I, 8, O|
    |15key| W, E, 3, R, S, D, F, G, J, K, L, U, I, 8, O|
    |16ikey| Z, X, C, A, S, D, F, G, J, K, L, ;, U, I, 8, O|
    |17key| A, Z, S, X, D, C, F, V, G, N, J, M, K, <, L, >, ;|

    </details>

  - フリーズノート打ち込み: `Shift` + 各種キー
  - 音楽再生・停止: `Enter`
  - 上下移動: 上下方向キー、`Space`(上方向)
  - ページ移動: 左右方向キー
  - 5ページ移動: `Shift` + 左右方向キー
  - 入力間隔変更: `Ctrl` + 1,2,3,4,5,6,7

    <details>
    <summary>対応表</summary>

    |使用キー|入力間隔| 
    |--|--|
    |1| 4分
    |2| 8分
    |3| 16分
    |4| 12分
    |5| 24分
    |6| 32分
    |7| 48分

    </details>

- マウス操作
  - ページ、ラベル移動: 各種ボタン（◁, ▷）
  - 途中のBPM/FirstNum変更: Labelにチェックを入れて数値を変更する
  - ダンおにデータ出力: GOボタン(クリップボードにコピーされます)
  - セーブデータ(JSON)出力: SAVEボタン(クリップボードにコピーされます)

## 開発者向け

CSSフレームワーク: UIkit (https://getuikit.com/)  
Canvas操作: Konva.js (https://konvajs.org/)

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

lint
```
npm run lint
```

## バージョン

### ver 1.1.0α
音楽再生機能の追加

### ver 1.0.0α
α版公開
